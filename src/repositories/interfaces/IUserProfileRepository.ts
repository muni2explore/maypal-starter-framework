import { UserProfile } from '../../entities/UserProfile';

export interface IUserProfileRepository {
  findById(id: string): Promise<UserProfile | null>;
  findByEmailAddress(emailAddress: string): Promise<UserProfile | null>;
  create(userProfile: Partial<UserProfile>): Promise<UserProfile>;
  update(id: string, userProfile: Partial<UserProfile>): Promise<UserProfile>;
  delete(id: string): Promise<void>;
}