import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './modules/auth/service/auth.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainComponent } from './shared/components/main/main.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from './client/components/header/header.component';
import { NavigationComponent } from './client/components/navigation/navigation.component';
import { FooterComponent } from './client/components/footer/footer.component';
import { CurrencyService } from './modules/currency/components/services/currency.service';
import { SettingService } from './modules/settings/service/setting.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MainComponent,
    FaIconComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public settingService: SettingService,
    private currencyService: CurrencyService
  ) {
    this.authService.checkAuth();
    this.settingService.getAllSettings();
    this.currencyService.getCurrencyById(
      this.settingService.setting?.currencyId ?? 2
    );
  }

  logout = faRightFromBracket;
  menuIcon = faBars;
  isSideBarShow = signal<boolean>(true);

  showSideBar() {
    this.isSideBarShow.set(!this.isSideBarShow());
  }

  exit() {
    this.authService.logout();
  }
}
