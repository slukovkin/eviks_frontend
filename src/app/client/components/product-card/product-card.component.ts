import { Component, Input } from '@angular/core';
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe';
import { OrderService } from '../../../modules/order/service/order.service';
import { IProductInStockAttributes } from '../../../modules/product/types/product.interfaces';
import { ModalService } from '../../../modules/modal/service/modal.service';
import { ProductService } from '../../../modules/product/service/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [EurToUahPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: IProductInStockAttributes;

  constructor(
    private readonly orderService: OrderService,
    public readonly productService: ProductService,
    public readonly modalService: ModalService
  ) {}

  addProduct(product?: IProductInStockAttributes) {
    if (product) {
      this.orderService.addProductInOrder(product);
    }
  }
}
