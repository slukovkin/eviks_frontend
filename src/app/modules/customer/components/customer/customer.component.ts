import { Component } from '@angular/core'
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common'
import { ModalComponent } from '../../../modal/components/modal.component'
import { CustomerFormComponent } from '../customer-form/customer-form.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { CustomerService } from '../../services/customer.service'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ICustomer } from '../../types/customer.interface'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { ModalService } from '../../../modal/service/modal.service'

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    AsyncPipe,
    ModalComponent,
    NgIf,
    CustomerFormComponent,
    NgSwitchCase,
    NgSwitch,
    FaIconComponent,
    FormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    StopPropagationDirective,
    ProductFormComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly modalService: ModalService,
    public readonly customerService: CustomerService,
  ) {
    this.customerService.getAllCustomers()
  }

  update(customer: ICustomer) {
    this.modalService.openModal('Редактирование', customer)
  }

  delete(id: number) {
    this.customerService.delete(id)
  }
}
