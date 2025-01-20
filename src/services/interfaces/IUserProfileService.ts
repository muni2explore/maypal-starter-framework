
import { UserProfile } from '../../entities/UserProfile';

export interface CreateUserProfileDTO {
  userid: string;
  integer: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  userLocale: string;
  modifiedBy: string;
}

export interface UpdateUserProfileDTO {
  integer?: number;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  password?: string;
  userLocale?: string;
  modifiedBy: string;
}

export interface IUserProfileService {
  createUserProfile(data: CreateUserProfileDTO): Promise<UserProfile>;
  updateUserProfile(id: string, data: UpdateUserProfileDTO): Promise<UserProfile>;
  getUserProfileById(id: string): Promise<UserProfile>;
  getUserProfileByEmailAddess(emailAddress: string): Promise<UserProfile>;
  deleteUserProfile(id: string): Promise<void>;
}