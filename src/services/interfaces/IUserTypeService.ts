
import { UserType } from '../../entities/UserType';

export interface CreateUserTypeDTO {
  type: string;
}

export interface UpdateUserTypeDTO {
  type: string;
}

export interface IUserTypeService {
  createUserType(data: CreateUserTypeDTO): Promise<UserType>;
  updateUserType(int: number, data: UpdateUserTypeDTO): Promise<UserType>;
  getUserTypeByInt(int: number): Promise<UserType>;
  getUserTypeByType(type: string): Promise<UserType>;
  deleteUserType(int: number): Promise<void>;
}