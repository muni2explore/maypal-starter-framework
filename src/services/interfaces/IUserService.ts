
import { User } from '../../entities/User';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: number, data: UpdateUserDTO): Promise<User>;
  getUserById(id: number): Promise<User>;
  deleteUser(id: number): Promise<void>;
}