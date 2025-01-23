
import { UserType } from '../../entities/UserType';

export interface CreateUserTypeDTO {
  type: string;
}

export interface UpdateUserTypeDTO {
  type: string;
}

export interface IUserTypeService {
  createUserType(data: CreateUserTypeDTO): Promise<UserType>;
  updateUserType(id: number, data: UpdateUserTypeDTO): Promise<UserType>;
  getUserTypeById(id: number): Promise<UserType>;
  getUserTypeByType(type: string): Promise<UserType>;
  deleteUserType(id: number): Promise<void>;
}