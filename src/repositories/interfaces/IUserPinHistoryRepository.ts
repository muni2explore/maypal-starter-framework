import { UserPinHistory } from '../../entities/UserPinHistory';

export interface IUserPinHistoryRepository {
  findById(id: string): Promise<UserPinHistory | null>;
  findByPinHistory(pin: string): Promise<UserPinHistory | null>;
  create(pinHistory: Partial<UserPinHistory>): Promise<UserPinHistory>;
  update(id: string, pinHistory: Partial<UserPinHistory>): Promise<UserPinHistory>;
  delete(id: string): Promise<void>;
}