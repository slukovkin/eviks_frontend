import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgIf } from '@angular/common'

export interface ICrossCreateData {
  code: string
  origin: string
}

@Component({
  selector: 'app-cross-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    NgIf,
  ],
  templateUrl: './cross-edit.component.html',
  styleUrl: './cross-edit.component.scss',
})
export class CrossEditComponent {
  @Input() formError = ''
  @Output() dataFromCrossForm = new EventEmitter<ICrossCreateData>()

  crossForm: FormGroup

  constructor() {
    this.crossForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      origin: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    this.dataFromCrossForm.emit(this.crossForm.value)
    this.crossForm.reset()
  }

  onChangeForm() {
    this.formError = ''
  }
}
