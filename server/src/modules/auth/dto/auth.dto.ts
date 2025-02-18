import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

enum Role {
  ADMIN,
  USER
}

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'firstName must be at least 3 characters long' })
  @IsString({ message: 'firstName must be a string.' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  institution: string;

  @IsOptional()
  @IsString()
  level: string;
}


export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
