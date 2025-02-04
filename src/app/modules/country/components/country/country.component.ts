import { Component, OnInit } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { Router, RouterLink } from '@angular/router'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CountryService } from '../../services/country.service'
import { ICountry } from '../../types/country.interface'

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    StopPropagationDirective,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly countryService: CountryService,
    private readonly router: Router,
  ) {
  }

  update(country: ICountry) {
    this.countryService.country = country
    this.router.navigate(['new_country']).then()
  }

  delete(id: number) {
    this.countryService.deleteCountryById(id)
  }

  ngOnInit(): void {
    this.countryService.getAllCountries()
  }

}
