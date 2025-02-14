import { injectable, inject } from 'tsyringe';
import { IUserProfileService, CreateUserProfileDTO, UpdateUserProfileDTO } from './interfaces/IUserProfileService';
import { IUserProfileRepository } from '../repositories/interfaces/IUserProfileRepository';
import { IUserService } from './interfaces/IUserService';
import { UserProfile } from '../entities/UserProfile';
import { TYPES } from '../di/types';

@injectable()
export class UserProfileService implements IUserProfileService {
    constructor(
        @inject(TYPES.UserProfileRepository)
        private userProfileRepository: IUserProfileRepository,

        @inject(TYPES.UserService)  
        private userService: IUserService
    ) {}

  async createUserProfile(data: CreateUserProfileDTO): Promise<UserProfile> {
    const existingEmailAddress = await this.userProfileRepository.findByEmailAddress(data.emailAddress);
    if (existingEmailAddress) {
      throw new Error('UserProfile with this EmailAdrress already exists');
    }
    return this.userProfileRepository.create(data);
  }

   async getUserProfileWithUserDetails(id: string): Promise<any> {

    const userProfile = await this.userProfileRepository.findById(id);
    if (!userProfile) {
      throw new Error("UserProfile not found");
    }

    const user = await this.userService.getUserByUserId(userProfile.userid); // Assuming 'userid' is a field in UserProfile

    if (!user) {
      throw new Error("User not found");
    }

    return {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      emailAddress: userProfile.emailAddress,
      phoneNumber: user.phoneNumber,  
      userId: user.userid,  
    };
  }


  async updateUserProfile(id: string, data: UpdateUserProfileDTO): Promise<UserProfile> {
    const user = await this.userProfileRepository.findById(id);
    if (!user) {
      throw new Error('UserProfile not found');
    }
    return this.userProfileRepository.update(id, data);
  }

  async getUserProfileById(id: string): Promise<UserProfile> {
    const user = await this.userProfileRepository.findById(id);
    if (!user) {
      throw new Error('UserProfile not found');
    }
    return user;
  }


  async getUserProfileByEmailAddess(emailAddress: string): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findByEmailAddress(emailAddress);
    if (!userProfile) {
      throw new Error('UserProfile not found');
    }
    return userProfile;
  }

  async deleteUserProfile(id: string): Promise<void> {
    const userProfile = await this.userProfileRepository.findById(id);
    if (!userProfile) {
      throw new Error('UserProfile not found');
    }
    await this.userProfileRepository.delete(id);
  }
}