import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {

  navigation = [
    {
      label: 'Номенклатура',
      route: '',
    }, {
      label: 'Акции',
      route: 'stock',
    }, {
      label: 'Распродажа',
      route: 'sale',
    }, {
      label: 'Избранные',
      route: 'favorites',
    }, {
      label: 'Новости',
      route: 'news',
    }, {
      label: 'Бренды',
      route: 'brands',
    },
    {
      label: 'Каталоги',
      route: 'catalogs',
    },
  ]
}
