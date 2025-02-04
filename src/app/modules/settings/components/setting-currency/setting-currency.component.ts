import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CurrencyService } from '../../../currency/components/services/currency.service'

@Component({
  selector: 'app-setting-currency',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting-currency.component.html',
  styleUrl: './setting-currency.component.scss',
})
export class SettingCurrencyComponent {
  constructor(public readonly currencyService: CurrencyService) {
    this.currencyService.getAllCurrencies()
  }
}
