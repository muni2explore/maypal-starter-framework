import { injectable, inject } from 'tsyringe';
import { IUserService, CreateUserDTO, UpdateUserDTO } from './interfaces/IUserService';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { User } from '../entities/User';
import { TYPES } from '../di/types';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.UserRepository)
        private userRepository: IUserRepository
    ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const existingPhoneNumberUser = await this.userRepository.findByPhoneNumber(data.phoneNumber);
    if (existingPhoneNumberUser) {
      throw new Error('User with this Mobile Number already exists');
    }
    return this.userRepository.create(data);
  }

  async updateUser(userid: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findByUserId(userid);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.update(userid, data);
  }

  async getUserByUserId(userid: string): Promise<User> {
    const user = await this.userRepository.findByUserId(userid);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }


  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deleteUser(userid: string): Promise<void> {
    const user = await this.userRepository.findByUserId(userid);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(userid);
  }
}