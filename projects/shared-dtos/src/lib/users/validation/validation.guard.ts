import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from './validation.service';
import {AUTH_LOGIN_URL} from '../auth/auth.token';
import {catchError, map, of} from 'rxjs';

export const validationGuard: CanActivateFn = (_route, state)=>{
  const validation = inject(ValidationService)
  const loginUrl = inject(AUTH_LOGIN_URL, {optional: false})

  return validation.validate().pipe(
    map(()=> true),
    catchError((_err)=>{
      const returnUrl = encodeURIComponent(state.url)
      window.location.href = `${loginUrl}?to=${returnUrl}`
      return of(false)
    })
  )
}
