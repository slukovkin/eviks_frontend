import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AppComponent } from '../../../app.component'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  constructor(
    private readonly router: Router,
    private readonly app: AppComponent,
  ) {
  }

  items = [
    // {
    //   routerLink: 'home',
    //   label: 'Дашбоард',
    // },
    {
      routerLink: 'products',
      label: 'Номенклатура',
    },
    {
      routerLink: 'incoming_invoice',
      label: 'Приходная накладная',
    },
    {
      routerLink: 'outgoing_invoice',
      label: 'Расходная накладная',
    },
    {
      routerLink: 'documents',
      label: 'Журнал документов',
    },
    {
      routerLink: 'orders',
      label: 'Журнал заказов',
    },
    // {
    //   routerLink: 'reports',
    //   label: 'Отчёты',
    // },
    {
      routerLink: 'customer',
      label: 'Контрагенты',
    },
    {
      routerLink: 'manufacturer',
      label: 'Производители',
    },
    {
      routerLink: 'stores',
      label: 'Склады',
    },
    {
      routerLink: 'currency',
      label: 'Валюты',
    },
    {
      routerLink: 'country',
      label: 'Страны',
    },
    {
      routerLink: 'categories',
      label: 'Категории',
    },
    {
      routerLink: 'settings',
      label: 'Настройки',
    },
    {
      routerLink: 'cross',
      label: 'Кросс таблица',
    },
    // {
    //   routerLink: 'upload',
    //   label: 'Загрузки',
    // },
    {
      routerLink: '',
      label: 'Сайт',
    },

  ]

  onRoute(route: string) {
    this.app.showSideBar()
    this.router.navigate([route]).then()
  }
}
