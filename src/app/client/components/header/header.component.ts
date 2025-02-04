import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/service/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ModalService } from '../../../modules/modal/service/modal.service';
import { ClientService } from '../../service/client.service';
import { BasketModalComponent } from '../basket-modal/basket-modal.component';
import { OrderComponent } from '../order/order.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrossService } from '../../../modules/cross/services/cross.service';
import { SettingService } from '../../../modules/settings/service/setting.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    BasketModalComponent,
    OrderComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchForm: FormGroup;

  constructor(
    public readonly authService: AuthService,
    public readonly modalService: ModalService,
    public readonly clientService: ClientService,
    private readonly crossService: CrossService,
    public readonly settingService: SettingService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.checkToken(token);
    }

    this.searchForm = new FormGroup({
      search: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const request = this.searchForm.controls['search'].value;
      this.searchForm.reset();
      this.crossService.searchProduct(request);
    }
  }
}
