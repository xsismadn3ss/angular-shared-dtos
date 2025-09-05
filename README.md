# shared-dtos

Librería de DTOs y utilidades compartidas para proyectos Angular. Incluye:

- DTOs comunes (MessageDto, BaseDto) y de autenticación (UserDto, LoginDto, LoginResponseDto). 🗒️
- Utilidades de validación basadas en class-validator/class-transformer (validateDto, validateAndBuildDto). ⬆️
- Servicios públicos para utilizar en proyectos de angular *(se requiere
configurar URL al que van a realizar peticiones los servicios)* 🚀
## Instalación

Asegúrate de tener `@angular/core`, `@angular/common`, `class-validator` y `class-transformer` en tu proyecto (se declaran como peerDependencies).

```bash
npm install @xsismadn3ss/shared-dtos class-validator class-transformer
```

## Uso rápido

### Crear un DTO y validar esquema
Esta librería utiliza ``class-validator`` para validar el esquema de los DTO.
Usa las utilidades de esta librería para hacer validaciones.

```ts
import {LoginDto} from "@xsismaddn3ss/shared-dtos";

// datos de formulario
const data = {
  username: "<USERNAME>",
  password: "<PASSWORD>"
}

// el método create valida automatiacmente el esquema del DTO
const loginDto = new LoginDto.create(data)
```

### Configurar servicios
En esta librería puedes encontrar servicios públicos para utilizarlos en tus
repositorios. Lo único que se debe hacer es indicar la URL que usara el servicio
para realizar las peticiones a la URL especificada.

En el archivo ``app.config.ts`` del proyecto de Angular agrega la siguiente
configuración.
````ts
import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {AuthService} from '@xsismadn3ss/shared-dtos';

export const appConfig: ApplicationConfig = {
  providers: [
    /*
    other providers here
     */
    //--------------------
    
    // configuración del servicio importado
    {
      provide: AuthService,
      useFactory: () => {
        const http = inject(HttpClient);
        // URL del servicio
        const baseUrl = '<AUTH_SERVICE_URL>';
        
        // agregar URL al crear la instancia del servicio
        return new AuthService(baseUrl);
      }
    }
  ]
};
````

### Utilizar servicios
Una vez que ya se han configurado las variables necesarias para utilizar un 
servicio ya se pueden importar en componentes e inyectar como dependencias.

````ts
import {AuthService} from '@xsismadn3ss/shared-dtos'

@Component({
   selector: 'app-login',
   template: "...",
})
export class LoginComponent {

 constructor(private readonly auth: AuthService){}

//...
}
````
