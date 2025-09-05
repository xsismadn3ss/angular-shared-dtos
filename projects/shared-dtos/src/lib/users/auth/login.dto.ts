import {IsNotEmpty, IsString} from "class-validator";
import {MessageDto} from '../../common/message.dto';
import {BaseDto} from '../../common/base.dto';

/**
 * ### ``LoginDto``
 * DTO para iniciar sesión
 */
export class LoginDto extends BaseDto {
  /**
   * ### dominio
   * Se utiliza para especificar el dominio que se usara para crear
   * la cookie que será usada como token de acceso
   */
  @IsString()
  domain: string = ""

  /**
   * ### username
   * Nombre de usuario
   */
  @IsString()
  @IsNotEmpty({message: 'Username is required'})
  username!: string;

  /**
   * ### password
   * Contraseña
   */
  @IsString()
  @IsNotEmpty({message: 'Password is required'})
  password!: string;
}

/**
 * ### ``LoginResponseDto``
 * Respuesta obtenida al haber iniciado sesión correctamente
 */
export class LoginResponseDto extends MessageDto{
  /**
   * token de acceso obtenido al iniciar sesión
   */
  token!: string;
  /**
   * nombre de usuario brindado por el servidor para tener contexto
   * de qué usuario ha iniciado sesión
   */
  username!: string;
}
