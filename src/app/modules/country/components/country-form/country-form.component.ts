import { Component, OnInit } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { RouterLink } from '@angular/router'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CountryService } from '../../services/country.service'
import { Location, NgIf } from '@angular/common'
import { ICountry } from '../../types/country.interface'

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    StopPropagationDirective,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    NgIf,
    MatError,
  ],
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss',
})
export class CountryFormComponent implements OnInit {

  countryForm!: FormGroup
  country?: ICountry

  constructor(
    public readonly countryService: CountryService,
    private readonly _location: Location,
  ) {
  }

  ngOnInit(): void {
    this.countryService.getAllCountries()
    this.country = this.countryService.country
    this.countryForm = new FormGroup({
      code: new FormControl(this.country?.code,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      title: new FormControl(this.country?.title, Validators.required),
    })
  }

  onSubmit() {
    if (this.countryForm.valid) {
      const country: ICountry = {
        id: this.country?.id,
        code: Number(this.countryForm.controls['code'].value),
        title: this.countryForm.controls['title'].value.toUpperCase(),
      }
      if (country.id) {
        this.countryService.updateCountry(country.id, country)
        this.back()
      } else {
        this.countryService.createCountry(country)
        this.back()
      }
    }
  }

  back() {
    this.countryForm.reset()
    this.countryService.country = undefined
    this._location.back()
  }
}
