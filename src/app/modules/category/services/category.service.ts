import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { ICategory } from '../types/category.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  categories: ICategory[] = []
  categoryDefault?: ICategory

  constructor(
    private readonly toast: ToastrService,
    private readonly http: HttpClient,
  ) {
  }

  getAllCategories() {
    this.http.get<ICategory[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_CATEGORIES)
      .pipe(
        tap((categories) => {
          this.categories = categories
        }),
      )
      .subscribe()
  }

  getCategoryById(id: number) {
    return this.http.get<ICategory>(Constants.BASE_URL + Constants.METHODS.GET_CATEGORY_BY_ID + id)
      .pipe(
        tap((category) => this.categoryDefault = category),
      )
      .subscribe()
  }

  create(category: ICategory) {
    return this.http.post<ICategory>(Constants.BASE_URL + Constants.METHODS.CREATE_CATEGORY, category)
      .pipe(
        tap((category) => this.categories.push(category)),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Category successfully saved')
      })
  }

  update(category: ICategory) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_CATEGORY_BY_ID + category.id, category)
      .pipe(
        tap(() => this.getAllCategories()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Category updated successfully')
      })
  }

  delete(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_CATEGORY_BY_ID + id)
      .pipe(
        tap(() => this.getAllCategories()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Category deleted successfully')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
