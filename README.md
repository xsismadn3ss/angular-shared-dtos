# shared-dtos

Librería de DTOs y utilidades compartidas para proyectos Angular. Incluye:

- DTOs comunes (MessageDto, BaseDto) y de autenticación (UserDto, LoginDto, LoginResponseDto).
- Utilidades de validación basadas en class-validator/class-transformer (validateDto, validateAndBuildDto).
- AuthService y token de inyección `AUTH_API_URL` para integración con API de autenticación.

## Instalación

Asegúrate de tener `@angular/core`, `@angular/common`, `class-validator` y `class-transformer` en tu proyecto (se declaran como peerDependencies).

```bash
npm install @xsismadn3ss/shared-dtos class-validator class-transformer
```

> Paquete publicado bajo el scope `@xsismadn3ss`.

## Uso rápido

```ts
// public-api exporta todo lo necesario
import { BaseDto, MessageDto, LoginDto, LoginResponseDto, UserDto, validateDto, validateAndBuildDto, AuthService, AUTH_API_URL } from '@xsismadn3ss/shared-dtos';
```

### Validación

```ts
import { BaseDto } from '@xsismadn3ss/shared-dtos';
import { IsString, IsNotEmpty } from 'class-validator';

class ExampleDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

const instance = await ExampleDto.create({ name: 'test' }); // lanza DtoValidationError si hay errores
```

### AuthService

Agrega el token `AUTH_API_URL` con la URL base de tu API:

```ts
import { AUTH_API_URL } from '@xsismadn3ss/shared-dtos';

providers: [
  { provide: AUTH_API_URL, useValue: 'https://api.example.com' }
]
```

Luego usa el servicio:

```ts
constructor(private auth: AuthService) {}

this.auth.login({ username: 'u', password: 'p', domain: 'colibrihub.com' })
  .subscribe(r => console.log(r.token));
```
