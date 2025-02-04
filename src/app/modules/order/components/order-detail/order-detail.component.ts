import { Component, OnInit } from '@angular/core'
import { AsyncPipe, CurrencyPipe, JsonPipe, Location, NgForOf, NgIf } from '@angular/common'
import { DocumentService } from '../../../documents/services/document.service'
import { IProductInBasket } from '../../../product/types/product.interfaces'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { GetCategoryTitleByIdPipe } from '../../../../shared/pipes/get-category-title-by-id.pipe'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    JsonPipe,
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
    EurToUahPipe,
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  products: IProductInBasket[] = []

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    private documentService: DocumentService,
    private _location: Location) {
  }

  ngOnInit(): void {
    this.products = this.documentService.products
  }

  back() {
    this._location.back()
  }
}
