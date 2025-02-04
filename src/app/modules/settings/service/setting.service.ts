import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ISetting } from '../types/setting.interface'
import { Constants } from '../../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class SettingService {

  setting?: ISetting

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
  ) {
  }

  create(setting: ISetting) {
    this.http.post<ISetting>(Constants.BASE_URL + Constants.METHODS.CREATE_SETTING, setting)
      .pipe(
        tap((setting) => this.setting = setting),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe(() => this.toast.success('Setting saved successfully'))
  }

  getAllSettings() {
    this.http.get<ISetting[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_SETTINGS)
      .pipe(
        tap((setting) => this.setting = setting[0]),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      )
      .subscribe()
  }

  getSettingById(id: number) {
    this.http.get<ISetting>(Constants.BASE_URL + Constants.METHODS.GET_SETTING_BY_ID + id)
      .subscribe()
  }

  updateSettingByID(setting: ISetting) {
    this.http.patch<ISetting>(Constants.BASE_URL + Constants.METHODS.UPDATE_SETTING_BY_ID + setting.id, setting)
      .pipe(
        tap(() => this.getAllSettings()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
      this.toast.success('Setting updated successfully')
    })
  }

  deleteSettingById(id: number) {
    this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_SETTING_BY_ID + id)
      .pipe(
        tap(() => this.getAllSettings()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
      this.toast.success('Setting deleted successfully')
    })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
