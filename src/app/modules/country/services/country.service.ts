import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { ICountry } from '../types/country.interface'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  countries: ICountry[] = []
  country?: ICountry

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
  ) {
  }

  createCountry(country: ICountry) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.CREATE_COUNTRY, country)
      .pipe(
        tap(() => this.getAllCountries()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Country saved successfully')
      })
  }

  updateCountry(id: number, country: ICountry) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_COUNTRY_BY_ID + id, country)
      .pipe(
        tap(() => this.getAllCountries()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Country updated successfully')
      })
  }

  deleteCountryById(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_COUNTRY_BY_ID + id)
      .pipe(
        tap(() => this.getAllCountries()),
        catchError((err) => {
          err.error.message = 'Удаление не возможно. Страна связана с производителями!'
          this.handleError(err)
          throw (`Удаление не возможно. Страна связана с производителями!`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Country removed successfully')
      })
  }

  getAllCountries() {
    return this.http.get<ICountry[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_COUNTRIES)
      .subscribe((countries) => this.countries = countries)
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
