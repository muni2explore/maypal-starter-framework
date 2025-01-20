import { injectable, inject } from 'tsyringe';
import { IVerificationCodeService, CreateVerificationCodeDTO, UpdateVerificationCodeDTO } from './interfaces/IVerificationCodeService';
import { IVerificationCodeRepository } from '../repositories/interfaces/IVerificationCodeRepository';
import { VerificationCode } from '../entities/VerificationCode';
import { TYPES } from '../di/types';

@injectable()
export class VerificationCodeService implements IVerificationCodeService {
    constructor(
        @inject(TYPES.VerificationCodeRepository)
        private verificationCodeRepository: IVerificationCodeRepository
    ) {}

  async createVerificationCode(data: CreateVerificationCodeDTO): Promise<VerificationCode> {
    const existingCode = await this.verificationCodeRepository.findByCode(data.code);
    if (existingCode) {
      throw new Error('VerificationCode with this Code already exists');
    }
    return this.verificationCodeRepository.create(data);
  }

  async updateVerificationCode(id: string, data: UpdateVerificationCodeDTO): Promise<VerificationCode> {
    const verificationCode = await this.verificationCodeRepository.findById(id);
    if (!verificationCode) {
      throw new Error('VerificationCode not found');
    }
    return this.verificationCodeRepository.update(id, data);
  }

  async getVerificationCodeById(id: string): Promise<VerificationCode> {
    const verificationCode = await this.verificationCodeRepository.findById(id);
    if (!verificationCode) {
      throw new Error('VerificationCode not found');
    }
    return verificationCode;
  }


  async getVerificationCodeByCode(code: string): Promise<VerificationCode> {
    const verificationCode = await this.verificationCodeRepository.findByCode(code);
    if (!verificationCode) {
      throw new Error('VerificationCode not found');
    }
    return verificationCode;
  }

  async deleteVerificationCode(id: string): Promise<void> {
    const VerificationCode = await this.verificationCodeRepository.findById(id);
    if (!VerificationCode) {
      throw new Error('VerificationCode not found');
    }
    await this.verificationCodeRepository.delete(id);
  }
}