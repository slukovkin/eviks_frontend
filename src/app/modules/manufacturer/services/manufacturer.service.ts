import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { IManufacturer } from '../types/manufacturer.interface'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {

  manufacturers: IManufacturer[] = []
  manufacturer?: IManufacturer

  constructor(
    private http: HttpClient,
    private readonly toast: ToastrService,
  ) {
  }

  getAllManufacturers() {
    return this.http.get<IManufacturer[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_MANUFACTURERS)
      .subscribe((manufacturers: IManufacturer[]) => this.manufacturers = manufacturers)
  }

  createManufacturer(manufacturer: IManufacturer) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.CREATE_MANUFACTURER, manufacturer)
      .pipe(
        tap(() => this.getAllManufacturers()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Производитель успешно сохранен')
      })
  }

  updateManufacturerById(id: number, manufacturer: IManufacturer) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_MANUFACTURER_BY_ID + id, manufacturer)
      .pipe(
        tap(() => this.getAllManufacturers()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Производитель успешно обновлен')
      })
  }

  deleteManufacturerById(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_MANUFACTURER_BY_ID + id)
      .pipe(
        tap(() => this.getAllManufacturers()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => {
        this.toast.success('Производитель успешно удален')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
