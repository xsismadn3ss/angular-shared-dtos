import {inject, Injectable, isDevMode} from '@angular/core';
import {LoginResponseDto, LoginDto} from './login.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageDto} from '../../common/message.dto';

/**
 * # ``Auth Service``
 * Servicio de autenticación, utiliza este servicio público para
 * autenticar a los usuarios.
 * ---
 * ## Configurar URL para el servicio
 * En el archivo ``app.config.ts`` en el proyecto de angular, agrega la siguiente configuración
 * ```ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideZoneChangeDetection({ eventCoalescing: true }),
 *     provideRouter(routes),
 *     provideHttpClient(),
 *     // configurar URL para el servicio AuthService
 *     {
 *       provide: AuthService,
 *       useFactory: () => {
 *         // esta URL debe ser manejada como variable de entorno, no debe estar
 *         // pública en el repositorio
 *         const baseUrl = '<AUTH_SERVICE_URL>';
 *         return new AuthService(baseUrl);
 *       }
 *     }
 *   ]
 * };
 * ```
 *---
 * ## Inyectar dependencia
 * ```ts
 * import {AuthService} from '@xsismadn3ss/shared-dtos'
 *
 * @Component({
 *    selector: 'app-login',
 *    template: ´...´
 * })
 * export class LoginComponent {
 *
 *  constructor(private readonly auth: AuthService){}
 *
 * //...
 * }
 * ```
 *
 * Alternativa de como inyectar el servicio a un componente
 * ```ts
 * import {AuthService} from '@xsismadn3ss/shared-dtos'
 * import {inject} from '@angular/core';
 *
 * @Component({
 *    selector: 'app-login',
 *    template: ´...´
 * })
 * export class LoginComponent {
 *  private readonly auhtService = inject(AuthService)
 *
 *  constructor(){}
 *
 * //...
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly  http = inject(HttpClient)

  constructor(private readonly baseUrl?: string | null) {}

  /**
   * ### Login
   * Utiliza esta función para iniciar sesión
   * @param credentials ``LoginDto`` datos de inicio de sesión
   * @return ``LoginResponseDto`` respuesta de inicio de sesión
   */
  login(credentials: LoginDto): Observable<LoginResponseDto>{
    const res = this.http.post<LoginResponseDto>(this.baseUrl + '/authentication/login', credentials);

    if(isDevMode()){
      res.subscribe(data =>{
        document.cookie = `token=${data.token}; max-age=60*60*24; path=/;`
      });
    }

    return res;
  }

  /**
   * ### Logout
   * Cerrar sesión eliminando el token de acceso del usuario
   * del navegador
   */
  logout(): Observable<MessageDto>{
    if(isDevMode()){
      document.cookie = `token=; max-age=0; path=/;`
    }
    return this.http.post<MessageDto>(
      this.baseUrl + '/authentication/logout',
      {},
      { withCredentials: true }
    );
  }
}
