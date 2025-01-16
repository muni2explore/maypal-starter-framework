import { IsString, IsOptional, IsMobilePhone, IsNumber, IsEmail, IsUUID, IsBoolean } from 'class-validator';

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

export class CreateUserProfileSchema {
  @IsUUID()
  userid!: string;

  @IsNumber()
  integer!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  emailAddress!: string;

  @IsString()
  password!: string;

  @IsString()
  userLocale!: string;

  @IsString()
  modifiedBy!: string;
}

export class UpdateUserProfileSchema {

  @IsOptional()
  @IsNumber()
  integer?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  userLocale?: string;

  @IsOptional()
  @IsString()
  modifiedBy!: string;
}

export class LoginUserProfileSchema {
  @IsEmail()
  emailAddress!: string;

  @IsString()
  password!: string;
}

export class CreateUserPinSchema {
  @IsUUID()
  userid!: string;

  @IsString()
  pin!: string;
  
  @IsString()
  expireAt?: string; 
}

export class UpdateUserPinSchema {

  @IsOptional()
  @IsString()
  pin?: string;

  @IsOptional()
  @IsString()
  expireAt?: string;
}
export class CreateUserPinHistorySchema {
  @IsUUID()
  userid!: string;

  @IsString()
  userPinId?: string; 

  @IsString()
  pin!: string;
  
}

export class UpdateUserPinHistorySchema {

  @IsOptional()
  @IsString()
  pin?: string;

}

export class CreateVerificationCodeSchema {

  @IsString()
  phoneNumber!: string;  
  
  @IsString()
  code!: string;  

  @IsNumber()
  validFor!: number; 

  @IsBoolean()
  active!: boolean;

}

export class UpdateVerificationCodeSchema {

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  validFor?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

}
export class CreateContactUsSchema {

  @IsMobilePhone() 
  phoneNumber!: string;

  @IsEmail() 
  emailAddress!: string;

  @IsString()
  subject!: string;

  @IsString()
  message!: string;

  @IsOptional() 
  @IsUUID() 
  userid?: string;

}

export class UpdateContactUsSchema {

  @IsOptional()
  @IsMobilePhone() 
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsUUID() 
  userid?: string;
}

export class CreateStickerTypeSchema {
  @IsString()
  type!: string; 
}

export class UpdateStickerTypeSchema {
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
