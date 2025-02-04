import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CurrencyService } from '../services/currency.service'
import { ICurrency } from '../../types/currency.interface'
import { ModalService } from '../../../modal/service/modal.service'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'

@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    StopPropagationDirective,
    MatOption,
    MatSelect,
  ],
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
})
export class CurrencyFormComponent {

  currency?: ICurrency | null
  currencyForm: FormGroup

  constructor(
    public readonly modalService: ModalService,
    public readonly currencyService: CurrencyService,
  ) {
    this.currency = this.modalService.itemSign()
    this.currencyForm = new FormGroup({
      code: new FormControl(this.currency?.code ?? '', [Validators.required]),
      name: new FormControl(this.currency?.name ?? '', [Validators.required]),
      rate: new FormControl(this.currency?.rate ?? 0, [Validators.required]),
    })
  }

  submit() {
    if (this.currencyForm.value) {
      const currency: ICurrency = {
        id: this.currency?.id,
        code: this.currencyForm.value.code.toUpperCase(),
        name: firstCharToUpperCase(this.currencyForm.value.name),
        rate: this.currencyForm.value.rate,
      }
      if (this.currency?.id) {
        this.currencyService.update(currency)
      } else {
        this.currencyService.create(currency)
      }
      this.exit()
    }
  }

  exit() {
    this.currencyForm.reset()
    this.currency = null
    this.modalService.closeModal()
  }
}
