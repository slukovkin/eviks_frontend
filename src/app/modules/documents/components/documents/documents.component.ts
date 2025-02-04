import { Component } from '@angular/core'
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modal/service/modal.service'
import { AuthService } from '../../../auth/service/auth.service'
import { DocumentService } from '../../services/document.service'
import { IInvoice } from '../../types/invoice.interface'
import { tap } from 'rxjs'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { Router } from '@angular/router'

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    StopPropagationDirective,
    CurrencyPipe,
    FaIconComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  isAdmin = false
  invoices: IInvoice[] = []

  constructor(
    public readonly documentService: DocumentService,
    public readonly modalService: ModalService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.isAdmin = this.authService.isAdmin$()
    this.documentService.getAllIncomingInvoices()
      .pipe(
        tap(invoices => this.invoices = invoices),
      ).subscribe()
  }

  showIncomingInvoice() {
    this.documentService.getAllIncomingInvoices()
      .pipe(
        tap(invoices => this.invoices = invoices),
      ).subscribe()
  }

  showOutgoingInvoice() {
    this.documentService.getAllOutgoingInvoices()
      .pipe(
        tap(invoices => this.invoices = invoices),
      ).subscribe()
  }

  viewInvoice(invoice: IInvoice) {
    this.documentService.selectIncomingId$.set(invoice.id!)
    if (invoice.type === 'in') {
      this.router.navigate(['view_incoming']).then()
    } else {
      this.router.navigate(['view_outgoing']).then()
    }
  }
}
