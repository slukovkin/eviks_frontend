import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'

@Component({
  selector: 'app-setting-sms',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './setting-sms.component.html',
  styleUrl: './setting-sms.component.scss',
})
export class SettingSmsComponent {

}
