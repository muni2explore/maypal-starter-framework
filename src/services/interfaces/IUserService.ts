
import { User } from '../../entities/User';

export interface CreateUserDTO {
  countryCode: number;
  phoneNumber: string;
}

export interface UpdateUserDTO {
  countryCode: number;
  phoneNumber: string;
}

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(userid: string, data: UpdateUserDTO): Promise<User>;
  getUserByUserId(userid: string): Promise<User>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User>;
  deleteUser(userid: string): Promise<void>;
  deactivateUser(userid: string): Promise<void>;
}