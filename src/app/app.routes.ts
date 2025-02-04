import { Routes } from '@angular/router'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegistrationComponent } from './modules/auth/components/registration/registration.component'
import { ProductsComponent } from './modules/product/components/products/products.component'
import { ProductFormComponent } from './modules/product/components/product-form/product-form.component'
import { DocumentsComponent } from './modules/documents/components/documents/documents.component'
import { SettingsComponent } from './modules/settings/components/settings/settings.component'
import { IncomingInvoiceComponent } from './modules/documents/components/incoming-invoice/incoming-invoice.component'
import { OutgoingInvoiceComponent } from './modules/documents/components/outgoing-invoice/outgoing-invoice.component'
import { CustomerComponent } from './modules/customer/components/customer/customer.component'
import { StoresComponent } from './modules/store/components/stores/stores.component'
import { CurrencyComponent } from './modules/currency/components/currency/currency.component'
import { ReportComponent } from './modules/report/components/report/report.component'
import { CategoryComponent } from './modules/category/components/category/category.component'
import { BasketComponent } from './client/components/basket/basket.component'
import { OrderListComponent } from './modules/order/components/order-list/order-list.component'
import { OrderComponent } from './client/components/order/order.component'
import { OrderDetailComponent } from './modules/order/components/order-detail/order-detail.component'
import { authGuard } from './shared/guards/auth.guard'
import { HomeComponent } from './modules/home/components/home/home.component'
import { ShopComponent } from './client/components/shop/shop.component'
import { StockComponent } from './client/components/stock/stock.component'
import { SaleComponent } from './client/components/sale/sale.component'
import { FavoritesComponent } from './client/components/favorites/favorites.component'
import { NewsComponent } from './client/components/news/news.component'
import { CatalogsComponent } from './client/components/catalogs/catalogs.component'
import { BrandsComponent } from './client/components/brands/brands.component'
import { SelectProductComponent } from './modules/documents/components/select-product/select-product.component'
import {
  SelectEditProductComponent,
} from './modules/documents/components/select-edit-product/select-edit-product.component'
import { UploadComponent } from './modules/upload/components/upload/upload.component'
import { CrossComponent } from './modules/cross/components/cross/cross.component'
import { ViewIncomingComponent } from './modules/documents/components/view-incoming/view-incoming.component'
import { ViewOutgoingComponent } from './modules/documents/components/view-outgoing/view-outgoing.component'
import { ManufacturerComponent } from './modules/manufacturer/components/manufacturer/manufacturer.component'
import {
  ManufacturerFormComponent,
} from './modules/manufacturer/components/manufacturer-form/manufacturer-form.component'
import { CountryComponent } from './modules/country/components/country/country.component'
import { CountryFormComponent } from './modules/country/components/country-form/country-form.component'

export const routes: Routes = [

  {
    path: '',
    component: ShopComponent,
    title: 'Номенклатура',
  },
  {
    path: 'basket',
    component: BasketComponent,
    title: 'Корзина',
  },
  {
    path: 'select_product',
    component: SelectProductComponent,
    title: 'Выбор товара',
  },
  {
    path: 'select_edit_product',
    component: SelectEditProductComponent,
    title: 'Выбор товара',
  },
  {
    path: 'stock',
    component: StockComponent,
    title: 'Акции',
  },
  {
    path: 'sale',
    component: SaleComponent,
    title: 'Распродажа',
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Избранные',
  },
  {
    path: 'news',
    component: NewsComponent,
    title: 'Новости',
  },
  {
    path: 'brands',
    component: BrandsComponent,
    title: 'Производители',
  },
  {
    path: 'catalogs',
    component: CatalogsComponent,
    title: 'Каталоги',
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Statistic',
    canActivate: [authGuard()],
  },
  {
    path: 'view_incoming',
    component: ViewIncomingComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'view_outgoing',
    component: ViewOutgoingComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products',
    canActivate: [authGuard()],
  },
  {
    path: 'new_product',
    component: ProductFormComponent,
    title: 'New Product',
    canActivate: [authGuard()],
  },
  {
    path: 'incoming_invoice',
    component: IncomingInvoiceComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'outgoing_invoice',
    component: OutgoingInvoiceComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'currency',
    component: CurrencyComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'reports',
    component: ReportComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'manufacturer',
    component: ManufacturerComponent,
    title: 'Manufacturer',
    canActivate: [authGuard()],
  },
  {
    path: 'new_manufacturer',
    component: ManufacturerFormComponent,
    title: 'New manufacturer',
    canActivate: [authGuard()],
  },
  {
    path: 'country',
    component: CountryComponent,
    title: 'Country',
    canActivate: [authGuard()],
  },
  {
    path: 'new_country',
    component: CountryFormComponent,
    title: 'New country',
    canActivate: [authGuard()],
  },
  {
    path: 'cross',
    component: CrossComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
