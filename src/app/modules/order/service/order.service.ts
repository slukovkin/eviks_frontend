import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IProductInBasket, IProductInStockAttributes } from '../../product/types/product.interfaces'
import { AuthService } from '../../auth/service/auth.service'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IOrder } from '../types/order.interface'
import { ToastrService } from 'ngx-toastr'
import { TelegramService } from '../../telegram/telegram.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  order: IProductInBasket[] = []
  currentProduct?: IProductInStockAttributes

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly telegramService: TelegramService,
    private readonly toast: ToastrService,
  ) {
  }

  create(order: IOrder) {
    return this.http.post<IOrder>(Constants.BASE_URL + Constants.METHODS.CREATE_ORDER, order)
      .subscribe(() => {
        this.toast.success('Заказ успешно создан')
        this.telegramService.sendMessage('Поступил новый заказ!').then()
      })
  }

  getAllOrders() {
    return this.http.get<IOrder[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_ORDERS)
  }

  addProductInOrder(product: IProductInStockAttributes) {
    const token = localStorage.getItem('token')
    if (token) {
      this.authService.checkToken(token)
      if (this.authService.isAuth$()) {
        this.currentProduct = product
        this.router.navigate(['basket']).then()
      } else {
        this.router.navigate(['login']).then()
      }
    } else {
      this.router.navigate(['login']).then()
    }
  }

  updateStatusOrderById(id: number) {
    this.http.get(Constants.BASE_URL + Constants.METHODS.UPDATE_STATUS_ORDER_BY_ID + id)
      .subscribe()
  }

  deleteOrder(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_ORDER_BY_ID + id)
  }
}
