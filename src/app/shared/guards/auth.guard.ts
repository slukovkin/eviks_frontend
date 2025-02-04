import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../../modules/auth/service/auth.service'

export function authGuard(): CanActivateFn {

  return () => {
    const router = inject(Router)
    const authService = inject(AuthService)
    let isAdmin = false

    const token = localStorage.getItem('token')
    if (token) {
      authService.checkToken(token)
      isAdmin = authService.isAdmin$()
    }

    if (isAdmin) {
      return true
    } else {
      router.navigate(['']).then()
      return false
    }
  }
}
