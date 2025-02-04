import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modal/service/modal.service'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { ICategory } from '../../types/category.interface'
import { CategoryService } from '../../services/category.service'

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    StopPropagationDirective,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {


  category?: ICategory | null
  categoryForm: FormGroup

  constructor(
    public readonly modalService: ModalService,
    public readonly categoryService: CategoryService,
  ) {
    this.category = this.modalService.itemSign()
    this.categoryForm = new FormGroup({
      title: new FormControl(this.category?.title ?? '', [Validators.required]),
      description: new FormControl(this.category?.description),
      percentage: new FormControl(this.category?.percentage),
    })
  }

  submit() {
    if (this.categoryForm.value) {
      const category: ICategory = {
        id: this.category?.id,
        title: firstCharToUpperCase(this.categoryForm.value.title),
        description: firstCharToUpperCase(this.categoryForm.value.description),
        percentage: Number(this.categoryForm.value.percentage),
      }
      if (this.category?.id) {
        this.categoryService.update(category)
      } else {
        this.categoryService.create(category)
      }
      this.exit()
    }
  }

  exit() {
    this.categoryForm.reset()
    this.category = null
    this.modalService.closeModal()
  }
}
