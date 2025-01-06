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
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    return this.userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.update(id, data);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(id);
  }
}