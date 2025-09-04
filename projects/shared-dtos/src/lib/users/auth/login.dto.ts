import {IsNotEmpty, IsString} from "class-validator";
import {MessageDto} from '../../common/message.dto';

export class LoginDto {
  domain: string = "colibrihub.com"

  @IsString()
  @IsNotEmpty({message: 'Username is required'})
  username!: string;

  @IsString()
  @IsNotEmpty({message: 'Password is required'})
  password!: string;
}

export class LoginResponseDto extends MessageDto{
  token!: string;
  username!: string;
}
