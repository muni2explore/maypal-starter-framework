import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { UserType } from '../entities/UserType';
import { AppDataSource } from '../config/database';
import { IUserTypeRepository } from './interfaces/IUserTypeRepository';

@injectable()
export class UserTypeRepository implements IUserTypeRepository {
  private repository: Repository<UserType>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserType);
  }

  async findById(id: number): Promise<UserType | null> {
    return this.repository.findOneBy({ id });
  }


  async findByType(type: string): Promise<UserType | null> {
    return this.repository.findOneBy({ type });
  }

  async create(userType: Partial<UserType>): Promise<UserType> {
    const newUserType = this.repository.create(userType);
    return this.repository.save(newUserType);
  }

  async update(id: number, userType: Partial<UserType>): Promise<UserType> {
    await this.repository.update(id, userType);
    const updateduserType = await this.findById(id);
    if (!updateduserType) throw new Error('User Type not found');
    return updateduserType;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}