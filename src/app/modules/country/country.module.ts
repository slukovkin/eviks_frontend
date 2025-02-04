import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CountryService } from './services/country.service'

@NgModule({
  declarations: [],
  providers: [CountryService],
  imports: [
    CommonModule,
  ],
})
export class CountryModule {
}
