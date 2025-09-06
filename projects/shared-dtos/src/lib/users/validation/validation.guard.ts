import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from './validation.service';
import {AUTH_LOGIN_URL} from '../auth/auth.token';
import {catchError, map, of} from 'rxjs';

export const validationGuard: CanActivateFn = (_route, state)=>{
  const validation = inject(ValidationService);
  const router = inject(Router);
  const loginUrl = inject(AUTH_LOGIN_URL, {optional: false});

  return validation.validate().pipe(
    map(()=> true),
    catchError((_err)=>{
      const returnUrl = encodeURIComponent(state.url)

      if (loginUrl) {
        // Si la URL de login es absoluta (otro dominio), usa redirección de navegador
        const isAbsolute = /^https?:\/\//i.test(loginUrl);
        const sep = loginUrl.includes('?') ? '&' : '?';
        const target = `${loginUrl}${sep}returnUrl=${returnUrl}`;

        if (isAbsolute) {
          window.location.assign(target);
        } else {
          // Login interno con ruta relativa
          router.navigate([loginUrl], { queryParams: { returnUrl: state.url } });
        }
      } else {
        throw Error("No se ha configurado la URL de inicio de sesión")
      }
      return of(false)
    })
  )
}
