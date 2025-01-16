import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { TYPES } from '../di/types';
import { IUserPinHistoryService } from '../services/interfaces/IUserPinHistoryService';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class UserPinHistoryController {
    constructor(
        @inject(TYPES.UserPinHistoryService)
        private userPinHistoryService: IUserPinHistoryService
    ) {}

  createUserPinHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPinHistory = await this.userPinHistoryService.createUserPinHistory(req.body);
      res.status(201).json({
        status: 'success',
        message: 'User PIN History created successfully',
        data: userPinHistory,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating user PinHistory' });
      }
    }
  };

  updateUserPinHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPinHistory = await this.userPinHistoryService.updateUserPinHistory((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'User PIN History Updated successfully',
        data: userPinHistory,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPinHistory not found' });
      }
    }
  };

  getUserPinHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPinHistory = await this.userPinHistoryService.getUserPinHistoryById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'User PIN History fetched successfully',
        data: userPinHistory,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPinHistory not found' });
      }
    }
  };

  deleteUserPinHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userPinHistoryService.deleteUserPinHistory(req.params.id);
      res.status(200).json({ status: 'success', message: 'UserPinHistory deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPinHistory not found' });
      }
    }
  };

}