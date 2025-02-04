import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ICurrency } from '../../types/currency.interface'
import { Constants } from '../../../../shared/constants/constants'
import { ToastrService } from 'ngx-toastr'
import { catchError, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  currencies: ICurrency[] = []
  currencyDefault?: ICurrency

  constructor(
    private readonly toast: ToastrService,
    private readonly http: HttpClient,
  ) {
  }

  getAllCurrencies() {
    this.http.get<ICurrency[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_CURRENCY)
      .pipe(
        tap((currencies: ICurrency[]) => {
          this.currencies = currencies
        }),
      )
      .subscribe()
  }

  getCurrencyById(id: number) {
    return this.http.get<ICurrency>(Constants.BASE_URL + Constants.METHODS.GET_CURRENCY_BY_ID + id)
      // .pipe(
      //   tap((currency) => this.currencyDefault = currency),
      // )
      .subscribe((currency) => this.currencyDefault = currency)
  }

  create(currency: ICurrency) {
    return this.http.post<ICurrency>(Constants.BASE_URL + Constants.METHODS.CREATE_CURRENCY, currency)
      .pipe(
        tap((currency) => this.currencies.push(currency)),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Currency successfully saved')
      })
  }

  update(currency: ICurrency) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_CURRENCY_RATE_BY_ID + currency.id, currency)
      .pipe(
        tap(() => this.getAllCurrencies()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Currency updated successfully')
      })
  }

  delete(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_CURRENCY_BY_ID + id)
      .pipe(
        tap(() => this.getAllCurrencies()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Currency deleted successfully')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
