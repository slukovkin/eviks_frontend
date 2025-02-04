import { Injectable, signal } from '@angular/core'
import { AuthService } from '../../auth/service/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible$ = signal(false)

  titleSing = signal<string>('')
  itemSign = signal<any>('')

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  openModal(title: string, item?: Object) {
    if (this.authService.isAdmin$()) {
      this.titleSing.set(title)
      this.itemSign.set(item)
      this.isVisible$.set(true)
    }
  }

  closeModal() {
    this.isVisible$.set(false)
  }
}
