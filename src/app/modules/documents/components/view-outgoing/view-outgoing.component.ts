import { Component, OnInit } from '@angular/core'
import { DocumentService } from '../../services/document.service'
import { CurrencyPipe, DatePipe, JsonPipe, NgIf } from '@angular/common'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IInvoice } from '../../types/invoice.interface'
import { IProductSelect } from '../../types/product-in-store.interface'

@Component({
  selector: 'app-view-outgoing',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    EurToUahPipe,
    DatePipe,
    FaIconComponent,
    StopPropagationDirective,
    CurrencyPipe,
  ],
  templateUrl: './view-outgoing.component.html',
  styleUrl: './view-outgoing.component.scss',
})
export class ViewOutgoingComponent implements OnInit {
  protected readonly deleteIcon = faTrash
  protected readonly editIcon = faPenToSquare
  invoice: IInvoice | null | undefined

  constructor(
    public readonly documentService: DocumentService,
  ) {
  }

  sum(products: IProductSelect[]): number {
    return products?.reduce((sum, curr) => sum + curr.priceOut * curr.qty, 0)
  }

  sumIncoming(products: IProductSelect[]): number {
    return products?.reduce((sum, curr) => sum + curr.priceIn * curr.qty, 0)
  }

  ngOnInit(): void {
    this.documentService.getOutgoingInvoiceById(this.documentService.selectIncomingId$())
      .subscribe((invoice: IInvoice | null) => this.invoice = invoice)
  }
}
