import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { catchError, tap } from 'rxjs'
import { IProduct, IProductInStockAttributes, ProductCreationAttributes } from '../types/product.interfaces'
import { IProductInStore } from '../../documents/types/product-in-store.interface'
import { Constants } from '../../../shared/constants/constants'

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  product?: IProductInStockAttributes
  selectCategory: number | null = null
  isSelectFilter = false
  products: IProductInStockAttributes[] = []
  foundProducts: IProductInStockAttributes[] = []
  searchByArticle = signal<string>('')

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  getAllProduct() {
    this.http.get<IProductInStockAttributes[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS)
      .pipe(
        tap((products) => {
          this.products = products
        }),
      ).subscribe()
  }

  getProductsFromStore(products: IProduct[]) {
    const payload: number[] = []
    products.forEach(product => payload.push(product.id))
    const ids = { ids: payload }

    this.http.post<IProductInStockAttributes[]>(Constants.BASE_URL + Constants.METHODS.FIND_PRODUCTS_BY_ARRAY_ID, ids)
      .pipe(
        tap((products: IProductInStockAttributes[]) => {
          this.foundProducts = products
        }),
      ).subscribe()
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(Constants.BASE_URL + Constants.METHODS.GET_PRODUCT_BY_ID + id)
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<IProductInStockAttributes>(Constants.BASE_URL + Constants.METHODS.CREATE_PRODUCT, product)
      .pipe(
        tap((product: IProductInStockAttributes) => {
          this.products.push(product)
          const payload: IProductInStore = {
            productId: product.id,
            storeId: 1,
            qty: product.qty,
            priceIn: 0,
            priceOut: 0,
          }
          this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE, payload).subscribe()
        }),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Product successfully saved')
      })
  }

  update(product: IProduct) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_PRODUCT_BY_ID + product.id, product)
      .pipe(
        tap(() => this.getAllProduct()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() =>
        this.toast.success('Product update successfully'),
      )
  }

  remove(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_PRODUCT_BY_ID + id)
      .pipe(
        tap(() => this.getAllProduct()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() =>
        this.toast.success('Product deleted successfully'),
      )
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
