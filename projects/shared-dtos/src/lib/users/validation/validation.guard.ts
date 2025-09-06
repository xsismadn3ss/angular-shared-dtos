import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from './validation.service';
import {AUTH_LOGIN_URL} from '../auth/auth.token';
import {catchError, map, of} from 'rxjs';

export const validationGuard: CanActivateFn = (_route, state)=>{
  const validation = inject(ValidationService);
  const loginUrl = inject(AUTH_LOGIN_URL, {optional: false});

  return  validation.validate().pipe(
    map((u)=>{
      const data = JSON.stringify(u)
      document.cookie = `user=${data}`
      console.log('Sesión valida con exito')
      return true
    }),
    catchError((_err) => {
      const returnUrl = decodeURIComponent(state.url)
      window.location.href = `${loginUrl}?redirect=${returnUrl}`
      console.error('No se pudo validar la sesión')
      return of(false)
    })
  )
}
