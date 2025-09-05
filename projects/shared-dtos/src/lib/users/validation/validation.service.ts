import {inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {findCookie} from '../../cookie';

/**
 * ## ``Validation Service``
 * Servicio de validación, utiliza este servicio para validar el inicio
 * de sesión de los usuarios.
 *---
 * Visita: [npmjs.com/package/@xsismadn3ss/shared-dtos](https://www.npmjs.com/package/@xsismadn3ss/shared-dtos)
 * para leer cómo se configura la URL para un servicio y como agregarlo como dependencia
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService{
  private readonly http = inject(HttpClient);

  constructor(private readonly baseUrl?: string | null) {
  }

  /**
   * Validar inicio de sesión del usuario, si el token de acceso
   * es válido devuelve los datos básicos de la cuenta del usuario
   * @return ``UserDto`` datos de usuario
   */
  validate(): Observable<UserDto>{
    if(isDevMode()){
      const access_token_cookie = findCookie('token');
      if(!access_token_cookie) {
        throw new Error('No token found');
      }

      return this.http.get<UserDto>(this.baseUrl + '/validation/header', {
        headers: {
          'Authorization': `Bearer ${access_token_cookie}`
        }
      })
    }

    return this.http.get<UserDto>(this.baseUrl + '/validation/cookie', {withCredentials: true});
  }
}

