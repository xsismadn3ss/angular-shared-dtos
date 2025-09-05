import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../common/base.dto';

export class UserDto extends BaseDto {
  @IsNumber()
  @IsInt()
  id!: number;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;
}
