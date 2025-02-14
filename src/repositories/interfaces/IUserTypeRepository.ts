import { UserType } from '../../entities/UserType';

export interface IUserTypeRepository {
  findById(id: number): Promise<UserType | null>;
  findByType(type: string): Promise<UserType | null>;
  create(userType: Partial<UserType>): Promise<UserType>;
  update(id: number, userType: Partial<UserType>): Promise<UserType>;
  delete(id: number): Promise<void>;
}