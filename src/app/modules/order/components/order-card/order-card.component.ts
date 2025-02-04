import { Component, Input } from '@angular/core'
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IOrder } from '../../types/order.interface'
import { CurrencyPipe, JsonPipe } from '@angular/common'
import { IProductInBasket } from '../../../product/types/product.interfaces'
import { CustomerService } from '../../../customer/services/customer.service'
import { ICustomer } from '../../../customer/types/customer.interface'
import { Router } from '@angular/router'
import { DocumentService } from '../../../documents/services/document.service'
import { OutgoingInvoiceService } from '../../../documents/services/outgoing-invoice.service'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    FaIconComponent,
    StopPropagationDirective,
    JsonPipe,
    CurrencyPipe,
    EurToUahPipe,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() order?: IOrder

  editIcon = faPenToSquare
  deleteIcon = faTrash
  visible = faEye
  customer?: ICustomer

  constructor(
    private customerService: CustomerService,
    private documentService: DocumentService,
    private outgoingInvoiceService: OutgoingInvoiceService,
    private router: Router) {
    this.customerService.getAllCustomers()
  }

  detail(products: IProductInBasket[]) {
    this.documentService.products = products
    this.router.navigate(['order-detail']).then()
  }

  findCustomer(userId: number) {
    this.customer = this.customerService.getCustomerById(userId)
    if (this.customer) {
      return `${this.customer.firstname} ${this.customer.lastname}`
    }
    return ''
  }

  sumOrder(prodList: IProductInBasket[]): number {
    return prodList.reduce((sum, next) =>
      sum += next.priceOut * next.qty, 0)
  }

  addOrderInOutgoingInvoice(order: IOrder) {
    this.documentService.isOrder$.set(true)
    this.outgoingInvoiceService.getLastOutgoingInvoiceNumber()
    this.documentService.productsToInvoice$.set(order)
    this.router.navigate(['outgoing_invoice']).then()
  }

  delete(id: number) {
    this.documentService.deleteOrder(id)
  }
}
