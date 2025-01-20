
import { UserPinHistory } from '../../entities/UserPinHistory';

export interface CreateUserPinHistoryDTO {
  userid: string;
  userPinId: string;
  pin: string;
  
}

export interface UpdateUserPinHistoryDTO {
  pin?: string;
}

export interface IUserPinHistoryService {
  createUserPinHistory(data: CreateUserPinHistoryDTO): Promise<UserPinHistory>;
  updateUserPinHistory(id: string, data: UpdateUserPinHistoryDTO): Promise<UserPinHistory>;
  getUserPinHistoryByPin(pin: string): Promise<UserPinHistory>;
  getUserPinHistoryById(id: string): Promise<UserPinHistory>;
  deleteUserPinHistory(id: string): Promise<void>;
}