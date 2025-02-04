import { Component } from '@angular/core'
import { ClientService } from '../../service/client.service'

@Component({
  selector: 'app-basket-modal',
  standalone: true,
  imports: [],
  templateUrl: './basket-modal.component.html',
  styleUrl: './basket-modal.component.scss',
})
export class BasketModalComponent {
  constructor(private clientService: ClientService) {
  }

  close() {
    this.clientService.closeModal()
  }
}
