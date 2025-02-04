import { Component } from '@angular/core'
import { AsyncPipe, NgIf } from '@angular/common'
import { CustomerFormComponent } from '../../../customer/components/customer-form/customer-form.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { ModalComponent } from '../../../modal/components/modal.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { CurrencyService } from '../services/currency.service'
import { ICurrency } from '../../types/currency.interface'
import { CurrencyFormComponent } from '../currency-form/currency-form.component'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ModalService } from '../../../modal/service/modal.service'

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomerFormComponent,
    FaIconComponent,
    ModalComponent,
    NgIf,
    StopPropagationDirective,
    CurrencyFormComponent,
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly modalService: ModalService,
    public readonly currencyService: CurrencyService,
  ) {
    this.currencyService.getAllCurrencies()
  }

  update(title: string, currency: ICurrency) {
    this.modalService.openModal(title, currency)
  }

  delete(id: number) {
    this.currencyService.delete(id)
  }

  exit() {
    this.modalService.closeModal()
  }
}
