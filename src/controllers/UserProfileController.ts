import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IUserProfileService } from '../services/interfaces/IUserProfileService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';
import * as bcrypt from "bcrypt";

@injectable()
export class UserProfileController {
    constructor(
        @inject(TYPES.UserProfileService)
        private userProfileService: IUserProfileService
    ) {}

  createUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userProfile = await this.userProfileService.createUserProfile(req.body);
      res.status(201).json({
        status: 'success',
        message: 'UserProfile created successfully',
        data: userProfile,
      });
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating user profile' });
      }
    }
  };

  updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userProfile = await this.userProfileService.updateUserProfile((req.params.id), req.body);
       res.status(200).json({
        status: 'success',
        message: 'UserProfile updated successfully',
        data: userProfile,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserProfile not found' });
      }
    }
  };

  getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userProfile = await this.userProfileService.getUserProfileById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'UserProfile fetched successfully',
        data: userProfile,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserProfile not found' });
      }
    }
  };

  deleteUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userProfileService.deleteUserProfile(req.params.id);
      res.status(200).json({ status: 'success', message: 'UserProfile deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserProfile not found' });
      }
    }
  };
  loginUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { emailAddress, password } = req.body;
      const userProfile = await this.userProfileService.getUserProfileByEmailAddess(emailAddress);
      const isPasswordValid = await bcrypt.compare(password, userProfile.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ status: 'success', message: 'Login successful', data: userProfile }); 
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ status: 'fail', message: 'Error logging in' });
      }
    }
  };
}