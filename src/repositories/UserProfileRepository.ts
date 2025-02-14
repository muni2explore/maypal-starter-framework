import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/UserProfile';
import { AppDataSource } from '../config/database';
import { IUserProfileRepository } from './interfaces/IUserProfileRepository';

@injectable()
export class UserProfileRepository implements IUserProfileRepository {
  private repository: Repository<UserProfile>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserProfile);
  }

  async findById(id: string): Promise<UserProfile | null> {
    return this.repository.findOneBy({ id });
  }


  async findByEmailAddress(emailAddress: string): Promise<UserProfile | null> {
    return this.repository.findOneBy({ emailAddress });
  }

  async create(userProfile: Partial<UserProfile>): Promise<UserProfile> {
    const newUserProfile = this.repository.create(userProfile);
    return this.repository.save(newUserProfile);
  }

  async update(id: string, userProfile: Partial<UserProfile>): Promise<UserProfile> {
    await this.repository.update(id, userProfile);
    const updatedUserProfile = await this.findById(id);
    if (!updatedUserProfile) throw new Error('UserProfile not found');
    return updatedUserProfile;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}