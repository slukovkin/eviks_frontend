import { Component } from '@angular/core'
import { AsyncPipe, NgIf } from '@angular/common'
import { CurrencyFormComponent } from '../../../currency/components/currency-form/currency-form.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { ModalComponent } from '../../../modal/components/modal.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CategoryService } from '../../services/category.service'
import { ICategory } from '../../types/category.interface'
import { ModalService } from '../../../modal/service/modal.service'
import { CategoryFormComponent } from '../category-form/category-form.component'

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyFormComponent,
    FaIconComponent,
    ModalComponent,
    NgIf,
    StopPropagationDirective,
    CategoryFormComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {


  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly modalService: ModalService,
    public readonly categoryService: CategoryService,
  ) {
    this.categoryService.getAllCategories()
  }

  update(title: string, category: ICategory): void {
    this.modalService.openModal(title, category)
  }

  delete(id: number) {
    this.categoryService.delete(id)
  }

  exit() {
    this.modalService.closeModal()
  }
}
