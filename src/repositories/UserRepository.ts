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

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    const updatedUser = await this.findById(id);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}