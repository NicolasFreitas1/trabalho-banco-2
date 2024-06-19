import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(250)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(['ADMIN', 'USER'])
  type: 'ADMIN' | 'USER';
}
