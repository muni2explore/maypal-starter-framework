
import { VerificationCode } from '../../entities/VerificationCode';

export interface CreateVerificationCodeDTO {
  phoneNumber: string;
  code: string;
  validFor: number;
  active: boolean;
}

export interface UpdateVerificationCodeDTO {
  phoneNumber?: string;
  code?: string; 
  validFor?: number; 
  active?: boolean;
}

export interface IVerificationCodeService {
  createVerificationCode(data: CreateVerificationCodeDTO): Promise<VerificationCode>;
  updateVerificationCode(id: string, data: UpdateVerificationCodeDTO): Promise<VerificationCode>;
  getVerificationCodeById(id: string): Promise<VerificationCode>;
  getVerificationCodeByCode(code: string): Promise<VerificationCode>;
  deleteVerificationCode(id: string): Promise<void>;
}