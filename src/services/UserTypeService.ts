import { injectable, inject } from 'tsyringe';
import { IUserTypeService, CreateUserTypeDTO, UpdateUserTypeDTO } from './interfaces/IUserTypeService';
import { IUserTypeRepository } from '../repositories/interfaces/IUserTypeRepository';
import { UserType } from '../entities/UserType';
import { TYPES } from '../di/types';

@injectable()
export class UserTypeService implements IUserTypeService {
    constructor(
        @inject(TYPES.UserTypeRepository)
        private userTypeRepository: IUserTypeRepository
    ) {}

  async createUserType(data: CreateUserTypeDTO): Promise<UserType> {
    const existingTypeUserType = await this.userTypeRepository.findByType(data.type);
    if (existingTypeUserType) {
      throw new Error('User with this Type already exists');
    }
    return this.userTypeRepository.create(data);
  }

  async updateUserType(id: number, data: UpdateUserTypeDTO): Promise<UserType> {
    const userType = await this.userTypeRepository.findById(id);
    if (!userType) {
      throw new Error('UserType not found');
    }
    return this.userTypeRepository.update(id, data);
  }

  async getUserTypeById(id: number): Promise<UserType> {
    const userType = await this.userTypeRepository.findById(id);
    if (!userType) {
      throw new Error('UserType not found');
    }
    return userType;
  }


  async getUserTypeByType(type: string): Promise<UserType> {
    const userType = await this.userTypeRepository.findByType(type);
    if (!userType) {
      throw new Error('UserType not found');
    }
    return userType;
  }

  async deleteUserType(id: number): Promise<void> {
    const userType = await this.userTypeRepository.findById(id);
    if (!userType) {
      throw new Error('UserType not found');
    }
    await this.userTypeRepository.delete(id);
  }
}