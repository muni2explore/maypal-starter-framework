import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { VerificationCode } from '../entities/VerificationCode';
import { AppDataSource } from '../config/database';
import { IVerificationCodeRepository } from './interfaces/IVerificationCodeRepository';

@injectable()
export class VerificationCodeRepository implements IVerificationCodeRepository {
  private repository: Repository<VerificationCode>;

  constructor() {
    this.repository = AppDataSource.getRepository(VerificationCode);
  }

  async findById(id: string): Promise<VerificationCode | null> {
    return this.repository.findOneBy({ id });
  }

  async findByCode(code: string): Promise<VerificationCode | null> {
    return this.repository.findOneBy({ code });
  }

  async create(verificationCode: Partial<VerificationCode>): Promise<VerificationCode> {
    const newVerificationCode = this.repository.create(verificationCode);
    return this.repository.save(newVerificationCode);
  }

  async update(id: string, verificationCode: Partial<VerificationCode>): Promise<VerificationCode> {
    await this.repository.update(id, verificationCode);
    const updatedVerificationCode = await this.findById(id);
    if (!updatedVerificationCode) throw new Error('VerificationCode not found');
    return updatedVerificationCode;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}