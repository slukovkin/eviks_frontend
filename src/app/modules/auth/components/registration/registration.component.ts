import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../service/auth.service'
import { UserInterface } from '../../types/user.interface'

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  user: FormGroup

  constructor(
    private readonly authService: AuthService,
  ) {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [
        Validators.required, Validators.minLength(6)]),
    }, {
      validators: this.repeatPasswordValidator.bind(this),
    })
  }

  submit() {
    if (this.user.valid) {
      const user: UserInterface = { email: this.user.value.email, password: this.user.value.password }
      this.authService.registration(user)
    }
  }

  repeatPasswordValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value
      ? null
      : { mismatch: true }
  }

  back() {
    this.authService.back()
  }
}
