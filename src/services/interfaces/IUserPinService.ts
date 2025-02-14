
import { UserPin } from '../../entities/UserPin';

export interface CreateUserPinDTO {
  userid: string;
  pin: string;
  expireAt: string;
  
}

export interface UpdateUserPinDTO {
  pin?: string;
  expireAt?: string;
}

export interface IUserPinService {
  createUserPin(data: CreateUserPinDTO): Promise<UserPin>;
  updateUserPin(id: string, data: UpdateUserPinDTO): Promise<UserPin>;
  getUserPinByPin(pin: string): Promise<UserPin>;
  getUserPinById(id: string): Promise<UserPin>;
  deleteUserPin(id: string): Promise<void>;
}