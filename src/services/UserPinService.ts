import { injectable, inject } from 'tsyringe';
import { IUserPinService, CreateUserPinDTO, UpdateUserPinDTO } from './interfaces/IUserPinService';
import { IUserPinRepository } from '../repositories/interfaces/IUserPinRepository';
import { UserPin } from '../entities/UserPin';
import { TYPES } from '../di/types';

@injectable()
export class UserPinService implements IUserPinService {
    constructor(
        @inject(TYPES.UserPinRepository)
        private userPinRepository: IUserPinRepository
    ) {}

  async createUserPin(data: CreateUserPinDTO): Promise<UserPin> {
    const existingPin = await this.userPinRepository.findByPin(data.pin);
    if (existingPin) {
      throw new Error('UserPin with this Pin already exists');
    }
    return this.userPinRepository.create(data);
  }

  async updateUserPin(id: string, data: UpdateUserPinDTO): Promise<UserPin> {
    const user = await this.userPinRepository.findById(id);
    if (!user) {
      throw new Error('UserPin not found');
    }
    return this.userPinRepository.update(id, data);
  }

  async getUserPinById(id: string): Promise<UserPin> {
    const user = await this.userPinRepository.findById(id);
    if (!user) {
      throw new Error('UserPin not found');
    }
    return user;
  }


  async getUserPinByPin(pin: string): Promise<UserPin> {
    const userPin = await this.userPinRepository.findByPin(pin);
    if (!userPin) {
      throw new Error('UserPin not found');
    }
    return userPin;
  }

  async deleteUserPin(id: string): Promise<void> {
    const userPin = await this.userPinRepository.findById(id);
    if (!userPin) {
      throw new Error('UserPin not found');
    }
    await this.userPinRepository.delete(id);
  }
}