import { UserType } from '../../entities/UserType';

export interface IUserTypeRepository {
  findByInt(int: number): Promise<UserType | null>;
  findByType(type: string): Promise<UserType | null>;
  create(userType: Partial<UserType>): Promise<UserType>;
  update(int: number, userType: Partial<UserType>): Promise<UserType>;
  delete(int: number): Promise<void>;
}