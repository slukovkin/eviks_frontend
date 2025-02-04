import { Component } from '@angular/core'
import { Location, NgIf } from '@angular/common'
import { IProductInBasket, IProductInStockAttributes } from '../../../modules/product/types/product.interfaces'
import { OrderService } from '../../../modules/order/service/order.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StopPropagationDirective } from '../../../shared/directives/stop-propagation.directive'
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe'

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    StopPropagationDirective,
    ReactiveFormsModule,
    FormsModule,
    EurToUahPipe,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  product?: IProductInStockAttributes
  qty = 1

  constructor(
    private readonly orderService: OrderService,
    private _location: Location,
  ) {
    this.product = this.orderService.currentProduct
  }

  increment() {
    if (this.product && (this.product.stores[0].ProductStore.qty - this.qty) > 0) {
      this.qty += 1
    }
  }

  decrement() {
    if (this.qty > 1)
      this.qty -= 1
  }

  submit() {
    const productOrder: IProductInBasket = {
      id: this.product?.id ?? 0,
      code: this.product?.code ?? 0,
      article: this.product?.article ?? '',
      title: this.product?.title ?? '',
      brandId: this.product?.brandId ?? 0,
      categoryId: this.product?.categoryId ?? 0,
      imageUrl: this.product?.imageUrl ?? '',
      cross: this.product?.cross ?? 0,
      storeId: this.product?.stores?.[0]?.ProductStore?.storeId!,
      qty: Number(this.qty),
      priceIn: this.product?.stores?.[0]?.ProductStore?.priceIn!,
      priceOut: this.product?.stores?.[0]?.ProductStore?.priceOut!,
    }
    const products = this.orderService.order

    if (products.length > 0 && products.find(pr => pr.id === productOrder.id)) {
      this.orderService.order = this.orderService.order.map((product) => ({
        ...product,
        qty: product.id === productOrder.id ? product.qty + productOrder.qty : product.qty,
      }))
    } else {
      this.orderService.order.push(productOrder)
    }
    this._location.back()
  }

  exit() {
    this._location.back()
  }
}
