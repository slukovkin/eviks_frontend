import { Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { ProductService } from '../../../product/service/product.service'
import { SettingService } from '../../../settings/service/setting.service'
import { StoreService } from '../../../store/store.service'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { SelectProductComponent } from '../select-product/select-product.component'
import { DocumentService } from '../../services/document.service'
import { CustomerService } from '../../../customer/services/customer.service'
import { ICustomer } from '../../../customer/types/customer.interface'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { IInvoice } from '../../types/invoice.interface'
import { OutgoingInvoiceService } from '../../services/outgoing-invoice.service'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-outgoing-invoice',
  standalone: true,
  imports: [FaIconComponent, FormsModule, NgForOf, MatOption, MatSelect, AsyncPipe, ModalComponent, NgIf, ReactiveFormsModule, SelectProductComponent, EurToUahPipe, StopPropagationDirective, RouterLink],
  templateUrl: './outgoing-invoice.component.html',
  styleUrl: './outgoing-invoice.component.scss',
})
export class OutgoingInvoiceComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  data = Date.now()

  outgoingForm: FormGroup
  invoiceNumber?: string | null
  initNumber = 'РН-0000001'

  constructor(
    public readonly productService: ProductService,
    public readonly settingService: SettingService,
    public readonly storeService: StoreService,
    public readonly currencyService: CurrencyService,
    public readonly modalService: ModalService,
    public readonly outgoingInvoiceService: OutgoingInvoiceService,
    public readonly customerService: CustomerService,
    public documentService: DocumentService,
    private readonly router: Router,
  ) {
    this.settingService.getAllSettings()
    this.productService.getAllProduct()
    this.storeService.getAllStore()
    this.customerService.getAllCustomers()
    this.currencyService.getAllCurrencies()
    this.outgoingInvoiceService.getLastOutgoingInvoiceNumber()
    this.invoiceNumber = this.outgoingInvoiceService.lastOutgoingInvoiceNumber
    this.documentService.isOutInvoice$.set(true)

    this.outgoingForm = new FormGroup({
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
    if (this.outgoingForm.valid) {
      const invoice: IInvoice = {
        doc_number: this.outgoingForm.controls['invoice'].value,
        type: 'out',
        orderId: this.documentService.productsToInvoice$()?.id,
        customerId: this.outgoingForm.controls['customer'].value,
        date: this.outgoingForm.controls['data_doc'].value,
        amount: this.sum(),
        status: false,
      }
      this.documentService.invoice$.set(invoice)
      this.saveProductInStore()
    }
  }

  unselectProduct(id: number, withOrder: number) {
    if (!withOrder) {
      this.documentService.products$.set(this.documentService.products$().filter(product => product.productId !== id))
    } else {
      const products = this.documentService.productsToInvoice$()!.productList.filter(product => product.id !== id)
      this.documentService.productsToInvoice$.set({
        ...this.documentService.productsToInvoice$()!,
        productList: products,
      })
    }
  }

  saveProductInStore() {
    this.outgoingInvoiceService.changeInvoice$.set(true)
    this.outgoingInvoiceService.removeProductFromStore()
  }

  sum(): number {
    if (!this.documentService.isOrder$()) {
      const products = this.documentService.products$()
      return products.reduce((sum, curr) => sum + curr.priceOut * curr.qty, 0)
    } else {
      const products = this.documentService.productsToInvoice$()?.productList
      if (products) {
        return products.reduce((sum, curr) => sum + curr.priceOut * curr.qty, 0)
      } else {
        return 0
      }
    }
  }

  addProduct() {
    this.documentService.isOrder$.set(false)
    this.router.navigate(['select_product']).then()
  }

  order() {
    this.documentService.isOrder$.set(true)
    this.router.navigate(['orders']).then()
  }

  clearProducts() {
    this.documentService.productsToInvoice$.set(null)
    this.documentService.products$.set([])
  }
}
