import {Inject, inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {LoginResponseDto, LoginDto} from './login.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageDto} from '../../common/message.dto';

/**
 * ``AUTH_API_URL``
 * <br>
 * Token de inyección que representa la URL base de la API de autenticación.
 * Este token se utiliza para configurar y proporcionar el punto final donde
 * se realizarán las operaciones de autenticación, como el inicio de sesión
 * o la validación del token.
 * ---
 * ### Implementación
 * ```typescript
 * import {AUTH_API_URL} from 'shared-dtos';
 *
 * @NgModule({
 *    declarations: [AppComponent],
 *    imports: [BrowserModule, HttpClientModule],
 *    providers:[
 *      // la url de la API debe ser manejada como variable de entorno, no debe estar pública
 *      { provide: AUTH_API_URL, useValue: 'https://api.example.com'} // <- API de autenticación
 *    ],
 *    bootstrap: [AppComponent]
 * })
 * export class AppModule
 * ```
 */
export const AUTH_API_URL = new InjectionToken('AUTH_API_URL')

/**
 * ## ``Auth Service``
 * Servicio de autenticación, utiliza este servicio público para
 * autenticar a los usuarios.
 * ---
 * ## Ejemplo de uso
 * ```typescript
 * import {AuthService} from 'shared-dtos'
 *
 * @Component({
 *    selector: 'app-login',
 * })
 * export class LoginComponent {
 *
 *  // inyectar dependencia
 *  constructor(private readonly auth: AuthService){}
 *
 * }
 * ```
 * Asegurate de inyectar el token para la URL del servicio, revisa la
 * documentación del servicio para ver como se asignan valores a los tokens
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly  http = inject(HttpClient)

  constructor(@Optional() @Inject(AUTH_API_URL) private readonly baseUrl?: string | null) {}

  login(credentials: LoginDto): Observable<LoginResponseDto>{
    return this.http.post<LoginResponseDto>(this.baseUrl + '/authentication/login', credentials);
  }

  logout(): Observable<MessageDto>{
    return this.http.post<MessageDto>(
      this.baseUrl + '/authentication/logout',
      {},
      { withCredentials: true }
    );
  }
}
