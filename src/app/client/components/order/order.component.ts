import { Component, OnInit } from '@angular/core';
import {
  CurrencyPipe,
  JsonPipe,
  Location,
  NgForOf,
  NgIf,
} from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { GetCategoryTitleByIdPipe } from '../../../shared/pipes/get-category-title-by-id.pipe';
import { StopPropagationDirective } from '../../../shared/directives/stop-propagation.directive';
import { ModalService } from '../../../modules/modal/service/modal.service';
import { OrderService } from '../../../modules/order/service/order.service';
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/service/auth.service';
import { CustomerService } from '../../../modules/customer/services/customer.service';
import { ICustomer } from '../../../modules/customer/types/customer.interface';
import { IOrder } from '../../../modules/order/types/order.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    FaIconComponent,
    FilterPipe,
    GetCategoryTitleByIdPipe,
    NgForOf,
    NgIf,
    StopPropagationDirective,
    EurToUahPipe,
    ReactiveFormsModule,
    RouterLink,
    JsonPipe,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  deleteIcon = faTrash;
  isOrder = false;
  user: ICustomer | null = null;
  orderForm!: FormGroup;
  total = 0;

  constructor(
    public readonly orderService: OrderService,
    public readonly modalService: ModalService,
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private readonly _location: Location
  ) {
    this.customerService.getAllCustomers();
    if (this.authService.userId) {
      this.user = this.customerService.getCustomerById(this.authService.userId);
    }
  }

  delete(id: number) {
    this.orderService.order = this.orderService.order.filter(
      (prod) => prod.id !== id
    );
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const user: ICustomer = {
        id: this.authService.userId!,
        firstname: this.orderForm.value.firstname!,
        lastname: this.orderForm.value.lastname!,
        email: this.user?.email!,
        phone: this.orderForm.value.phone!,
      };
      if (!this.user?.firstname) {
        this.customerService.update(user);
      }
      const order: IOrder = {
        userId: user.id!,
        productList: this.orderService.order,
        city: this.orderForm.controls['city'].value.toUpperCase(),
        post: this.orderForm.controls['post'].value.toLowerCase(),
      };
      this.orderService.create(order);
      this.orderService.order = [];
      this.back();
    }
  }

  sum() {
    this.total = 0;
    this.total += this.orderService.order.reduce(
      (sum, curr) => sum + curr.qty * curr.priceOut,
      0
    );
  }

  back() {
    this._location.back();
  }

  ngOnInit(): void {
    this.sum();
    this.orderForm = new FormGroup({
      firstname: new FormControl(this.user?.firstname ?? '', [
        Validators.required,
      ]),
      lastname: new FormControl(this.user?.lastname ?? '', [
        Validators.required,
      ]),
      phone: new FormControl(this.user?.phone ?? '', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
    });
  }
}
