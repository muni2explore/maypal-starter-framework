import { User } from '../../entities/User';

export interface IUserRepository {
  findByUserId(userid: string): Promise<User | null>;
  findByPhoneNumber(phoneNumber: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(userid: string, user: Partial<User>): Promise<User>;
  delete(userid: string): Promise<void>;
}