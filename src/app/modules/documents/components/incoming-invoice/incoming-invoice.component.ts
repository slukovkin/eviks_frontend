import { Component, OnInit } from '@angular/core'
import { AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common'
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatFormField, MatSelect } from '@angular/material/select'
import { ProductService } from '../../../product/service/product.service'
import { SettingService } from '../../../settings/service/setting.service'
import { StoreService } from '../../../store/store.service'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { SelectProductComponent } from '../select-product/select-product.component'
import { IncomingInvoiceService } from '../../services/incoming-invoice.service'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { SelectEditProductComponent } from '../select-edit-product/select-edit-product.component'
import { ICustomer } from '../../../customer/types/customer.interface'
import { CustomerService } from '../../../customer/services/customer.service'
import { OrderService } from '../../../order/service/order.service'
import { IInvoice } from '../../types/invoice.interface'
import { DocumentService } from '../../services/document.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-incoming-invoice',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    FormsModule,
    AsyncPipe,
    ModalComponent,
    NgIf,
    ProductFormComponent,
    SelectProductComponent,
    FilterPipe,
    StopPropagationDirective,
    SelectEditProductComponent,
    MatFormField,
    DatePipe,
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './incoming-invoice.component.html',
  styleUrl: './incoming-invoice.component.scss',
})
export class IncomingInvoiceComponent implements OnInit {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  data = Date.now()

  incomingForm: FormGroup
  invoiceNumber?: string | null
  initNumber = 'ПН-0000001'

  constructor(
    public readonly productService: ProductService,
    public readonly settingService: SettingService,
    public readonly storeService: StoreService,
    public readonly currencyService: CurrencyService,
    public readonly customerService: CustomerService,
    public readonly modalService: ModalService,
    public readonly orderService: OrderService,
    public readonly incomingInvoiceService: IncomingInvoiceService,
    public readonly documentService: DocumentService,
  ) {
    this.settingService.getAllSettings()
    this.productService.getAllProduct()
    this.storeService.getAllStore()
    this.currencyService.getAllCurrencies()
    this.customerService.getAllCustomers()
    this.incomingInvoiceService.getLastInvoiceNumber()
    this.invoiceNumber = this.incomingInvoiceService.lastInvoiceNumber

    this.orderService.getAllOrders().subscribe()
    this.documentService.isOutInvoice$.set(false)

    this.incomingForm = new FormGroup({
      invoice: new FormControl(this.invoiceNumber ?? this.initNumber, [Validators.required]),
      data_doc: new FormControl(''),
      firm: new FormControl(this.settingService.setting?.firmName, [Validators.required]),
      customer: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      store: new FormControl(this.settingService.setting?.storeId, [Validators.required]),
      currency: new FormControl(this.settingService.setting?.currencyId, [Validators.required]),
    })
  }

  getCustomer(customer: ICustomer): string {
    return `${customer.firstname} ${customer.lastname}`
  }

  submit() {
    if (this.incomingForm.valid) {
      const invoice: IInvoice = {
        doc_number: this.incomingForm.controls['invoice'].value,
        type: 'in',
        customerId: this.incomingForm.controls['customer'].value,
        date: this.incomingForm.controls['data_doc'].value,
        amount: this.sum(),
        status: false,
      }
      this.documentService.invoice$.set(invoice)
      this.saveProductInStore()
    }
  }

  unselectProduct(id: number) {
    this.documentService.products$.set(this.documentService.products$().filter(product => product.productId !== id))
  }

  saveProductInStore() {
    this.incomingInvoiceService.changeInvoice$.set(false)
    this.incomingInvoiceService.saveProductInStore()
  }

  sum(): number {
    const products = this.documentService.products$()
    return products.reduce((sum, curr) => sum + curr.priceIn * curr.qty, 0)
  }

  clearProducts() {
    this.documentService.products$.set([])
  }

  ngOnInit() {

  }

}
