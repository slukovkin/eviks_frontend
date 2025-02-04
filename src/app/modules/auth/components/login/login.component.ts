import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { JsonPipe, NgIf } from '@angular/common'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: FormGroup

  constructor(private readonly authService: AuthService) {
    this.user = new FormGroup({
      email: new FormControl('user@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('111111', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.user.valid) {
      this.authService.login(this.user.value)
    }
  }

  back() {
    this.authService.back()
  }
}
