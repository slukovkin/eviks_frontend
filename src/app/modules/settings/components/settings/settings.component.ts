import { Component } from '@angular/core'
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { SettingCurrencyComponent } from '../setting-currency/setting-currency.component'
import { SettingSmsComponent } from '../setting-sms/setting-sms.component'
import { SettingTelegramComponent } from '../setting-telegram/setting-telegram.component'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { StoreService } from '../../../store/store.service'
import { SettingService } from '../../service/setting.service'
import { ISetting } from '../../types/setting.interface'
import { NgFor } from '@angular/common'
import { ITelegramSetting } from '../../types/telegram-setting.interface'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    FormsModule,
    NgFor,
    SettingCurrencyComponent,
    SettingSmsComponent,
    SettingTelegramComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  settingForm: FormGroup
  telegramDataSetting?: ITelegramSetting

  setting?: ISetting | undefined

  constructor(
    public readonly currencyService: CurrencyService,
    public readonly storeService: StoreService,
    public readonly settingService: SettingService,
  ) {
    this.settingService.getAllSettings()
    this.setting = this.settingService.setting
    this.currencyService.getAllCurrencies()
    this.storeService.getAllStore()

    this.settingForm = new FormGroup({
      title: new FormControl(this.setting?.firmName, Validators.required),
      store: new FormControl(settingService.setting?.storeId, Validators.required),
      currency: new FormControl(settingService.setting?.currencyId, Validators.required),
      typePriceOne: new FormControl(this.setting?.priceTypeOne),
      typePriceTwo: new FormControl(this.setting?.priceTypeTwo),
      typePriceThree: new FormControl(this.setting?.priceTypeThree),
      markup: new FormControl(this.setting?.markup),
    })
  }

  onChangeTelegramSetting(value: ITelegramSetting) {
    this.telegramDataSetting = value
  }

  submit() {
    if (this.settingForm.valid) {
      const setting: ISetting = {
        id: this.setting?.id,
        firmName: this.settingForm.value.title.toUpperCase(),
        currencyId: Number(this.settingForm.value.currency),
        storeId: Number(this.settingForm.value.store),
        priceTypeOne: Number(this.settingForm.value.typePriceOne),
        priceTypeTwo: Number(this.settingForm.value.typePriceTwo),
        priceTypeThree: Number(this.settingForm.value.typePriceThree),
        markup: Number(this.settingForm.value.markup),
      }
      if (this.setting?.id) {
        this.settingService.updateSettingByID(
          {
            ...setting,
            telegramBotId: this.telegramDataSetting?.telegramBotId,
            telegramKey: this.telegramDataSetting?.telegramToken,
          })
      } else {
        this.settingService.create({
          ...setting,
          telegramBotId: this.telegramDataSetting?.telegramBotId,
          telegramKey: this.telegramDataSetting?.telegramToken,
        })
      }
    }
  }
}
