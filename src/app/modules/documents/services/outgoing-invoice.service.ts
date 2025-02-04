import { Injectable, signal } from '@angular/core'
import { IProductInStore } from '../types/product-in-store.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { DocumentService } from './document.service'
import { IInvoice } from '../types/invoice.interface'
import { OrderService } from '../../order/service/order.service'

@Injectable({
  providedIn: 'root',
})
export class OutgoingInvoiceService {
  changeInvoice$ = signal(false)
  lastOutgoingInvoiceNumber?: string | null

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
    private readonly documentService: DocumentService,
    private readonly orderService: OrderService,
    private readonly router: Router,
  ) {
    this.getLastOutgoingInvoiceNumber()
  }

  getLastOutgoingInvoiceNumber() {
    return this.http.get(Constants.BASE_URL + Constants.METHODS.GET_LAST_OUTGOING_INVOICE_NUMBER, {
      responseType: 'text',
    })
      .pipe(
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(i => this.lastOutgoingInvoiceNumber = i)
  }

  removeProductFromStore() {
    if (!this.documentService.isOrder$()) {
      const products = this.documentService.products$()
      products.forEach((product) => {
        const payload: IProductInStore = {
          productId: product.productId,
          storeId: product.storeId,
          qty: product.qty / -1,
          priceIn: product.priceIn,
          priceOut: product.priceOut,
        }
        this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE,
          payload)
          .pipe(
            catchError((err) => {
              this.handleError(err)
              throw (`Error => ${err.message}`)
            }),
          ).subscribe()
      })
    } else {
      const products = this.documentService.productsToInvoice$()
      products?.productList.forEach((product) => {
        const payload: IProductInStore = {
          productId: product.id,
          storeId: product.storeId,
          qty: product.qty / -1,
          priceIn: product.priceIn,
          priceOut: product.priceOut,
        }
        this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE,
          payload)
          .pipe(
            catchError((err) => {
              this.handleError(err)
              throw (`Error => ${err.message}`)
            }),
          ).subscribe()
      })
    }
    this.saveInvoice()
  }

  saveInvoice() {
    !this.documentService.isOrder$()
      ? this.http.post<IInvoice>(Constants.BASE_URL + Constants.METHODS.CREATE_OUTGOING_INVOICE,
        { ...this.documentService.invoice$(), products: this.documentService.products$() })
        .subscribe(() => {
          this.resetState()
        })
      : this.http.post<IInvoice>(Constants.BASE_URL + Constants.METHODS.CREATE_OUTGOING_INVOICE,
        { ...this.documentService.invoice$(), products: this.documentService.productsToInvoice$()?.productList })
        .subscribe(() => {
          this.orderService.updateStatusOrderById(this.documentService.invoice$()?.orderId!)
          this.resetState()
        })
  }

  resetState() {
    this.documentService.invoice$.set(null)
    this.documentService.productsToInvoice$.set(null)
    this.documentService.products$.set([])
    this.getLastOutgoingInvoiceNumber()
    this.toast.success('Products successfully saved')
    this.router.navigate(['products']).then()
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
