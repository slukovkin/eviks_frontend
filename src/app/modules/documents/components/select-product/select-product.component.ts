import { Component, Input, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductService } from '../../../product/service/product.service'
import { IProduct, IProductInStockAttributes } from '../../../product/types/product.interfaces'
import { AsyncPipe, JsonPipe, Location, NgForOf, NgIf } from '@angular/common'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ModalService } from '../../../modal/service/modal.service'
import { SelectEditProductComponent } from '../select-edit-product/select-edit-product.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IProductSelect } from '../../types/product-in-store.interface'
import { DocumentService } from '../../services/document.service'
import { ProductsComponent } from '../../../product/components/products/products.component'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-select-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    FilterPipe,
    AsyncPipe,
    ModalComponent,
    NgIf,
    SelectEditProductComponent,
    StopPropagationDirective,
    ReactiveFormsModule,
    JsonPipe,
    ProductsComponent,
    RouterLink,
  ],
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.scss',
})
export class SelectProductComponent implements OnInit {
  @Input() product?: IProductSelect

  selectedProduct!: IProduct
  search: string = ''
  productInStock: IProductInStockAttributes[] = []

  constructor(
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
    private readonly documentService: DocumentService,
    private readonly router: Router,
    private readonly _location: Location,
  ) {
  }

  select(product: IProduct) {
    this.selectedProduct = product
    this._location.back()
  }

  editProduct(product: IProduct) {
    this.documentService.selectProduct$.set(product)
    this.router.navigate(['select_edit_product']).then()
  }

  ngOnInit(): void {
    this.productService.getAllProduct()
    this.productInStock = this.productService.products
  }

  back() {
    this._location.back()
  }
}
