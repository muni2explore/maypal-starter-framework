import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import { IUserRepository } from './interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByUserId(userid: string): Promise<User | null> {
    return this.repository.findOneBy({ userid });
  }


  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.repository.findOneBy({ phoneNumber });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(userid: string, user: Partial<User>): Promise<User> {
    await this.repository.update(userid, user);
    const updatedUser = await this.findByUserId(userid);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  async delete(userid: string): Promise<void> {
    await this.repository.delete(userid);
  }
}