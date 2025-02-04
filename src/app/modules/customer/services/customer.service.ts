import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ICustomer } from '../types/customer.interface'
import { Constants } from '../../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  isShowCustomerForm = signal<boolean>(false)
  customers: ICustomer[] = []
  customerSign = signal<any>('')

  constructor(
    private readonly toast: ToastrService,
    private readonly http: HttpClient,
  ) {
  }

  getCustomerById(id: number) {
    return this.customers.filter(customer => customer.id === id)[0]
  }

  create(customer: ICustomer) {
    return this.http.post<ICustomer>(Constants.BASE_URL + Constants.METHODS.CREATE_CUSTOMERS, customer)
      .pipe(
        tap((customer) => this.customers.push(customer)),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Customer successfully saved')
      })
  }

  getAllCustomers() {
    return this.http.get<ICustomer[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_CUSTOMERS)
      .pipe(
        tap((customers: ICustomer[]) => {
          this.customers = customers
        }),
      )
      .subscribe()
  }

  update(customer: ICustomer) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_CUSTOMERS_BY_ID + customer.id, customer)
      .pipe(
        tap(() => this.getAllCustomers()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Customer updated successfully')
      })
  }

  delete(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_CUSTOMERS_BY_ID + id)
      .pipe(
        tap(() => this.getAllCustomers()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Customer deleted successfully')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
