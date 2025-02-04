import { Injectable, signal } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { IStore } from './types/store.interface'

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  isShowStoreForm = signal<boolean>(false)
  stores: IStore[] = []
  storeSign = signal<any>('')

  constructor(
    private readonly toast: ToastrService,
    private readonly http: HttpClient,
  ) {
  }

  create(store: IStore) {
    return this.http.post<IStore>(Constants.BASE_URL + Constants.METHODS.CREATE_STORE, store)
      .pipe(
        tap((store) => this.stores.push(store)),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Store successfully saved')
      })
  }

  getAllStore() {
    return this.http.get<IStore[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_STORES)
      .pipe(
        tap((stores) => {
          this.stores = stores
        }),
      )
      .subscribe()
  }

  getStoreById(id: number) {
    return this.http.get<IStore>(Constants.BASE_URL + Constants.METHODS.GET_STORE_BY_ID + id)
      .subscribe()
  }

  update(store: IStore) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_STORE_BY_ID + store.id, store)
      .pipe(
        tap(() => this.getAllStore()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Store updated successfully')
      })
  }

  delete(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_STORE_BY_ID + id)
      .pipe(
        tap(() => this.getAllStore()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Store deleted successfully')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
