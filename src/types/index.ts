import { IsString, IsOptional, IsMobilePhone, IsNumber } from 'class-validator';

export class CreateUserSchema {
  @IsNumber()
  countryCode!: number;

  @IsMobilePhone()
  phoneNumber!: string; 
}

export class UpdateUserSchema {
  @IsOptional()
  @IsNumber()
  countryCode!: number;

  @IsOptional()
  @IsMobilePhone()
  phoneNumber?: string;
}

export class LoginUserSchema {
  @IsMobilePhone()
  phoneNumber?: string; 
}

export class CreateUserTypeSchema {
  @IsString()
  type!: string; 
}

export class UpdateUserTypeSchema {
  @IsOptional()
  @IsString()
  type!: string; 
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
