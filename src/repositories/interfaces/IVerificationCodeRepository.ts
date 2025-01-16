import { VerificationCode } from '../../entities/VerificationCode';

export interface IVerificationCodeRepository {
  findById(id: string): Promise<VerificationCode | null>;
  findByCode(code: string): Promise<VerificationCode | null>;
  create(verificationCode: Partial<VerificationCode>): Promise<VerificationCode>;
  update(id: string, verificationCode: Partial<VerificationCode>): Promise<VerificationCode>;
  delete(id: string): Promise<void>;
}