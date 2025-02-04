import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ModalService } from '../../../modal/service/modal.service'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { IStore } from '../../types/store.interface'
import { StoreService } from '../../store.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './store-form.component.html',
  styleUrl: './store-form.component.scss',
})
export class StoreFormComponent {
  storeForm: FormGroup
  store?: IStore

  constructor(
    private readonly modalService: ModalService,
    public readonly storeService: StoreService,
  ) {
    this.store = this.modalService.itemSign()
    this.storeForm = new FormGroup({
      title: new FormControl(this.store?.title, [Validators.required]),
      description: new FormControl(this.store?.description),

    })
  }

  submit() {
    if (this.storeForm.valid) {
      const store: IStore = {
        id: this.store?.id,
        title: firstCharToUpperCase(this.storeForm.controls['title'].value),
        description: firstCharToUpperCase(this.storeForm.controls['description'].value),
      }
      if (this.store?.id) {
        this.storeService.update(store)
      } else {
        this.storeService.create(store)
      }
      this.exit()
      this.modalService.closeModal()
    }
  }

  exit() {
    this.storeForm.reset()
    this.storeService.storeSign.set('')
    this.storeService.isShowStoreForm.set(false)
  }
}
