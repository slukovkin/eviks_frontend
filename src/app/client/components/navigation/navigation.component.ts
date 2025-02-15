import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navigation = [
    {
      label: 'Хостинг',
      route: '',
    },
    {
      label: 'Віртуальні сервера',
      route: 'vps',
    },
    {
      label: 'Виділені сервера',
      route: 'vps',
    },
    {
      label: 'Корпоративна пошта',
      route: 'email',
    },
    {
      label: 'Хмарні обчислення',
      route: 'stock',
    },
    // {
    //   label: 'Акції',
    //   route: 'stock',
    // },
    // {
    //   label: 'Распродажа',
    //   route: 'sale',
    // },
    // {
    //   label: 'Вибрані',
    //   route: 'favorites',
    // },
    {
      label: 'Новини',
      route: 'news',
    },
    // {
    //   label: 'Бренды',
    //   route: 'brands',
    // },
    // {
    //   label: 'Каталоги',
    //   route: 'catalogs',
    // },
  ];
}
