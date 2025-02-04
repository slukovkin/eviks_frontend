import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { ITelegramSetting } from '../../types/telegram-setting.interface'
import { SettingService } from '../../service/setting.service'

@Component({
  selector: 'app-setting-telegram',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FaIconComponent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    MatButton,
  ],
  templateUrl: './setting-telegram.component.html',
  styleUrl: './setting-telegram.component.scss',
})
export class SettingTelegramComponent {
  @Output() telegramSetting: EventEmitter<ITelegramSetting> = new EventEmitter()

  telegramForm: FormGroup

  constructor(private settingService: SettingService) {
    this.settingService.getAllSettings()
    this.telegramForm = new FormGroup({
      telegramBotId: new FormControl(this.settingService.setting?.telegramBotId, Validators.required),
      telegramToken: new FormControl(this.settingService.setting?.telegramKey, Validators.required),
    })
  }

  onSubmit() {
    if (this.telegramForm.valid) {
      this.telegramSetting.emit({
        telegramBotId: this.telegramForm.controls['telegramBotId'].value,
        telegramToken: this.telegramForm.controls['telegramToken'].value,
      })
    }
  }
}
