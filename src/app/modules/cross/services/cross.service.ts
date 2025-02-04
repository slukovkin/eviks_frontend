import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { ICross } from '../types/cross.interface'
import { IProduct } from '../../product/types/product.interfaces'
import { ProductService } from '../../product/service/product.service'
import { catchError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class CrossService {

  constructor(
    private readonly http: HttpClient,
    private productService: ProductService,
    private toast: ToastrService,
  ) {
  }

  products: ICross[] = []
  cross_table$ = signal<ICross[]>([])

  getAllCross() {
    this.http.get<ICross[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_CROSS_TABLE)
      .pipe(
      ).subscribe((cross) => this.cross_table$.set(cross))
  }

  createNewCross(cross: ICross) {
    this.http.post(Constants.BASE_URL + Constants.METHODS.CREATE_CROSS, cross)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe()
  }

  searchProduct(request: string) {
    return this.http.get<IProduct[]>(Constants.BASE_URL + Constants.METHODS.GET_PRODUCTS_BY_ORIGIN + request)
      .subscribe((products: IProduct[]) => {
        this.productService.foundProducts = []
        this.productService.getProductsFromStore(products)
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
