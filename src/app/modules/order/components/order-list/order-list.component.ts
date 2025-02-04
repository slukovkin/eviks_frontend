import { Component } from '@angular/core'
import { DocumentService } from '../../../documents/services/document.service'
import { JsonPipe } from '@angular/common'
import { OrderCardComponent } from '../order-card/order-card.component'

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    JsonPipe,
    OrderCardComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {

  constructor(
    public readonly documentService: DocumentService,
  ) {
    this.documentService.getAllOrder()
  }
}
