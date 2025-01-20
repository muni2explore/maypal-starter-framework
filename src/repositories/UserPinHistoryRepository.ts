import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { UserPinHistory } from '../entities/UserPinHistory';
import { AppDataSource } from '../config/database';
import { IUserPinHistoryRepository } from './interfaces/IUserPinHistoryRepository';

@injectable()
export class UserPinHistoryRepository implements IUserPinHistoryRepository {
  private repository: Repository<UserPinHistory>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserPinHistory);
  }

  async findById(id: string): Promise<UserPinHistory | null> {
    return this.repository.findOneBy({ id });
  }

  async findByPinHistory(pin: string): Promise<UserPinHistory | null> {
    return this.repository.findOneBy({ pin });
  }

  async create(pinHistory: Partial<UserPinHistory>): Promise<UserPinHistory> {
    const newUserPinHistory = this.repository.create(pinHistory);
    return this.repository.save(newUserPinHistory);
  }

  async update(id: string, pinHistory: Partial<UserPinHistory>): Promise<UserPinHistory> {
    await this.repository.update(id, pinHistory);
    const updatedUserPinHistory = await this.findById(id);
    if (!updatedUserPinHistory) throw new Error('UserPinHistory not found');
    return updatedUserPinHistory;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}