import { Component, OnInit } from '@angular/core'
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { GetCategoryTitleByIdPipe } from '../../../../shared/pipes/get-category-title-by-id.pipe'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../../product/service/product.service'
import { ModalService } from '../../../modal/service/modal.service'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FaIconComponent,
    FilterPipe,
    GetCategoryTitleByIdPipe,
    ModalComponent,
    NgForOf,
    NgIf,
    ProductFormComponent,
    StopPropagationDirective,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  title = ''

  constructor(
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
  ) {
  }

  delete(id: number) {
    this.productService.remove(id)
  }

  ngOnInit(): void {
    this.productService.getAllProduct()
  }
}
