import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { AsyncPipe, CurrencyPipe, JsonPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common'
import { ProductCardComponent } from '../../../../client/components/product-card/product-card.component'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../product-form/product-form.component'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../../shared/pipes/uah-to-eur.pipe'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { AuthService } from '../../../auth/service/auth.service'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { GetCategoryTitleByIdPipe } from '../../../../shared/pipes/get-category-title-by-id.pipe'
import { MatButton } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router'
import { IProductInStockAttributes } from '../../types/product.interfaces'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgForOf,
    ModalComponent,
    AsyncPipe,
    NgIf,
    ProductFormComponent,
    EurToUahPipe,
    CurrencyPipe,
    UahToEurPipe,
    StopPropagationDirective,
    TitleCasePipe,
    NgClass,
    FilterPipe,
    FaIconComponent,
    GetCategoryTitleByIdPipe,
    JsonPipe,
    MatButton,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  title = ''
  isAdmin = false

  constructor(
    private readonly authService: AuthService,
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
    private readonly router: Router,
  ) {
    this.isAdmin = this.authService.isAdmin$()
  }

  update(product: IProductInStockAttributes) {
    this.productService.product = product
    this.router.navigate(['new_product']).then()
  }

  delete(id: number) {
    this.productService.remove(id)
  }

  ngOnInit(): void {
    this.productService.getAllProduct()
  }
}
