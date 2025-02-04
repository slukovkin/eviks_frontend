import { Component } from '@angular/core'
import { IStore } from '../../types/store.interface'
import { AsyncPipe, NgIf } from '@angular/common'
import { CustomerFormComponent } from '../../../customer/components/customer-form/customer-form.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { ModalComponent } from '../../../modal/components/modal.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modal/service/modal.service'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { StoreService } from '../../store.service'
import { StoreFormComponent } from '../store-form/store-form.component'

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomerFormComponent,
    FaIconComponent,
    ModalComponent,
    NgIf,
    StopPropagationDirective,
    StoreFormComponent,
  ],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
})
export class StoresComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly modalService: ModalService,
    public readonly storeService: StoreService,
  ) {
    this.storeService.getAllStore()
  }

  update(store: IStore) {
    // this.customerService.customerSign.set(customer)
    this.modalService.openModal('Редактирование', store)
    this.storeService.isShowStoreForm.set(true)
  }

  delete(id: number) {
    this.storeService.delete(id)
  }
}
