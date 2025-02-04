import { Component, Input } from '@angular/core'
import { ICategory } from '../../../modules/category/types/category.interface'
import { ProductService } from '../../../modules/product/service/product.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() categories?: ICategory[]

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  showProductsWithCategory(id: number | null) {
    this.productService.selectCategory = (id === 1 ? null : id)
    this.productService.isSelectFilter = !!this.productService.selectCategory
  }

  showAllProduct() {
    this.productService.selectCategory = null
    this.productService.isSelectFilter = false
  }
}
