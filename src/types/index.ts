import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserSchema {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

export class UpdateUserSchema {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}



export interface ValidationErrorDetail {
    property: string;
    constraints: { [type: string]: string; } | undefined;
}

export interface IAppError {
    statusCode: number;
    message: string;
    details?: ValidationErrorDetail[] | string;
    isOperational?: boolean;
}
