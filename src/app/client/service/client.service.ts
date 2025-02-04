import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  isVisible$ = signal(false)

  openModal() {
    this.isVisible$.set(true)
  }

  closeModal() {
    this.isVisible$.set(false)
  }
}
