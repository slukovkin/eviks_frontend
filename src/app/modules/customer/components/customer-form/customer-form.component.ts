import { Component } from '@angular/core'
import { ModalComponent } from '../../../modal/components/modal.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CustomerService } from '../../services/customer.service'
import { ICustomer } from '../../types/customer.interface'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { ModalService } from '../../../modal/service/modal.service'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    ModalComponent,
    AsyncPipe,
    NgIf,
    ProductFormComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  customerForm: FormGroup
  customer?: ICustomer

  constructor(
    private readonly modalService: ModalService,
    public readonly customerService: CustomerService,
  ) {
    this.customer = this.modalService.itemSign()
    this.customerForm = new FormGroup({
      firstname: new FormControl(this.customer?.firstname, [Validators.required]),
      lastname: new FormControl(this.customer?.lastname),
      email: new FormControl(this.customer?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.customer?.password),
      phone: new FormControl(this.customer?.phone, [Validators.required]),
      description: new FormControl(this.customer?.description),
    })
  }

  submit() {
    if (this.customerForm.valid) {
      const customer: ICustomer = {
        id: this.customer?.id,
        firstname: firstCharToUpperCase(this.customerForm.controls['firstname'].value),
        lastname: firstCharToUpperCase(this.customerForm.controls['lastname'].value),
        email: this.customerForm.controls['email'].value,
        password: this.customerForm.controls['password'].value,
        phone: this.customerForm.controls['phone'].value,
        description: firstCharToUpperCase(this.customerForm.controls['description'].value ?? ''),
      }
      if (this.customer?.id) {
        this.customerService.update(customer)
      } else {
        this.customerService.create(customer)
      }
      this.exit()
    }
  }

  exit() {
    this.customerForm.reset()
    this.customerService.customerSign.set('')
    this.customerService.isShowCustomerForm.set(false)
    this.modalService.closeModal()
  }
}
