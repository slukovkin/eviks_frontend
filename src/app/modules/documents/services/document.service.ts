import { Injectable, signal } from '@angular/core'
import { OrderService } from '../../order/service/order.service'
import { IOrder } from '../../order/types/order.interface'
import { tap } from 'rxjs'
import { IProduct, IProductInBasket } from '../../product/types/product.interfaces'
import { IInvoice } from '../types/invoice.interface'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IProductSelect } from '../types/product-in-store.interface'

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  orders: IOrder[] = []
  products: IProductInBasket[] = []
  selectProduct$ = signal<IProduct | null>(null)
  productsToInvoice$ = signal<IOrder | null>(null)
  invoice$ = signal<IInvoice | null>(null)
  products$ = signal<IProductSelect[]>([])
  isOrder$ = signal(false)
  isOutInvoice$ = signal(true)
  selectIncomingId$ = signal(0)

  constructor(
    private readonly orderService: OrderService,
    private readonly http: HttpClient,
  ) {
  }

  addSelectProductToArray(product: IProductSelect) {
    this.products$.set([...this.products$(), product])
  }

  getAllIncomingInvoices() {
    return this.http.get<IInvoice[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_INCOMING_INVOICES)
  }

  getAllOutgoingInvoices() {
    return this.http.get<IInvoice[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_OUTGOING_INVOICES)
  }

  getInComingInvoiceById(invoiceId: number) {
    return this.http.get<IInvoice>(Constants.BASE_URL + Constants.METHODS.GET_INGOING_INVOICE_BY_ID + invoiceId)
  }

  getOutgoingInvoiceById(invoiceId: number) {
    return this.http.get<IInvoice>(Constants.BASE_URL + Constants.METHODS.GET_OUTGOING_INVOICE_BY_ID + invoiceId)
  }

  getAllOrder() {
    this.orders = []
    this.products = []
    return this.orderService.getAllOrders()
      .pipe(
        tap((orders: IOrder[]) => {
          this.orders = orders
        }),
      )
      .subscribe()
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id)
      .pipe(
        tap(() => this.getAllOrder()),
      )
      .subscribe()
  }
}
