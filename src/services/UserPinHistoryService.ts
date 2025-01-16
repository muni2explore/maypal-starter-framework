import { injectable, inject } from 'tsyringe';
import { IUserPinHistoryService, CreateUserPinHistoryDTO, UpdateUserPinHistoryDTO } from './interfaces/IUserPinHistoryService';
import { IUserPinHistoryRepository } from '../repositories/interfaces/IUserPinHistoryRepository';
import { UserPinHistory } from '../entities/UserPinHistory';
import { TYPES } from '../di/types';

@injectable()
export class UserPinHistoryService implements IUserPinHistoryService {
    constructor(
        @inject(TYPES.UserPinHistoryRepository)
        private userPinHistoryRepository: IUserPinHistoryRepository
    ) {}

  async createUserPinHistory(data: CreateUserPinHistoryDTO): Promise<UserPinHistory> {
    const existingPinHistory = await this.userPinHistoryRepository.findByPinHistory(data.pin);
    if (existingPinHistory) {
      throw new Error('UserPinHistory with this Pin already exists');
    }
    return this.userPinHistoryRepository.create(data);
  }

  async updateUserPinHistory(id: string, data: UpdateUserPinHistoryDTO): Promise<UserPinHistory> {
    const user = await this.userPinHistoryRepository.findById(id);
    if (!user) {
      throw new Error('UserPinHistory not found');
    }
    return this.userPinHistoryRepository.update(id, data);
  }

  async getUserPinHistoryById(id: string): Promise<UserPinHistory> {
    const user = await this.userPinHistoryRepository.findById(id);
    if (!user) {
      throw new Error('UserPinHistory not found');
    }
    return user;
  }


  async getUserPinHistoryByPin(pin: string): Promise<UserPinHistory> {
    const userPinHistory = await this.userPinHistoryRepository.findByPinHistory(pin);
    if (!userPinHistory) {
      throw new Error('UserPinHistory not found');
    }
    return userPinHistory;
  }

  async deleteUserPinHistory(id: string): Promise<void> {
    const userPinHistory = await this.userPinHistoryRepository.findById(id);
    if (!userPinHistory) {
      throw new Error('UserPinHistory not found');
    }
    await this.userPinHistoryRepository.delete(id);
  }
}