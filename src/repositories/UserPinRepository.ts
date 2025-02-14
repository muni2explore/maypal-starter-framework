import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { UserPin } from '../entities/UserPin';
import { AppDataSource } from '../config/database';
import { IUserPinRepository } from './interfaces/IUserPinRepository';

@injectable()
export class UserPinRepository implements IUserPinRepository {
  private repository: Repository<UserPin>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserPin);
  }

  async findById(id: string): Promise<UserPin | null> {
    return this.repository.findOneBy({ id });
  }

  async findByPin(pin: string): Promise<UserPin | null> {
    return this.repository.findOneBy({ pin });
  }

  async create(userPin: Partial<UserPin>): Promise<UserPin> {
    const newUserPin = this.repository.create(userPin);
    return this.repository.save(newUserPin);
  }

  async update(id: string, userPin: Partial<UserPin>): Promise<UserPin> {
    await this.repository.update(id, userPin);
    const updatedUserPin = await this.findById(id);
    if (!updatedUserPin) throw new Error('UserPin not found');
    return updatedUserPin;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}