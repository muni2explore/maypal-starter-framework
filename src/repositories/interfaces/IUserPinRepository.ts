import { UserPin } from '../../entities/UserPin';

export interface IUserPinRepository {
  findById(id: string): Promise<UserPin | null>;
  findByPin(pin: string): Promise<UserPin | null>;
  create(userPin: Partial<UserPin>): Promise<UserPin>;
  update(id: string, user: Partial<UserPin>): Promise<UserPin>;
  delete(id: string): Promise<void>;
}