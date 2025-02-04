import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ITokenResponse, UserInterface } from '../types/user.interface'
import { Constants } from '../../../shared/constants/constants'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { catchError, tap } from 'rxjs'
import { IResponseToken } from '../types/response-user.interface'
import { IUserProfile } from '../types/user-profile'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuth$ = signal<boolean>(false)
  isAdmin$ = signal<boolean>(false)
  userId: number | null = null
  token: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toast: ToastrService) {
    const token = localStorage.getItem('token')
    this.isAuth$.set(!!token)
  }

  login(user: UserInterface) {
    return this.http.post<IResponseToken>(Constants.BASE_URL + Constants.METHODS.LOGIN,
      user)
      .pipe(
        tap((response: IResponseToken) => {
          this.handleAuthSuccess(response)
        }),
        catchError((err) => {
          this.handleError(err)
          throw new Error(err.error.message)
        }),
      ).subscribe(() => {
        this.toast.success('Login successfully', '', { timeOut: 500 })
      })
  }

  registration(user: UserInterface) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.REGISTRATION,
      user)
      .pipe(
        tap(() => {
          this.login(user)
        }),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Registration successfully', '', { timeOut: 500 })
      })
  }

  checkAuth() {
    const token = localStorage.getItem('token')
    if (token) {
      this.checkToken(token)
    }
  }

  checkToken(token: string) {
    return this.http.get<ITokenResponse>(Constants.BASE_URL + Constants.METHODS.CHECK_TOKEN + token)
      .pipe(
        tap((response) => {
          if (response.roles[0].value === 'ADMIN') {
            this.isAuth$.set(true)
            this.isAdmin$.set(true)
          } else if (response.roles[0].value === 'USER') {
            this.isAuth$.set(true)
            this.isAdmin$.set(false)
          } else {
            this.isAuth$.set(false)
            this.isAdmin$.set(false)
          }
          this.userId = response.id
        }),
      ).subscribe()
  }

  update(user: IUserProfile) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_USER_BY_ID + user.id, user).subscribe()
  }

  private handleAuthSuccess(response: IResponseToken) {
    localStorage.setItem('token', response.token)
    this.token = response.token
    this.checkToken(response.token)
    this.router.navigate(['']).then()
  }

  logout() {
    localStorage.clear()
    this.isAuth$.set(false)
    this.isAdmin$.set(false)
    this.token = null
    this.userId = null
    this.router.navigate(['']).then()
    this.toast.success('Logout', '', { timeOut: 500 })
  }

  back() {
    this.router.navigate(['']).then()
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}

