import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { TYPES } from '../di/types';
import { IUserPinService } from '../services/interfaces/IUserPinService';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class UserPinController {
    constructor(
        @inject(TYPES.UserPinService)
        private userPinService: IUserPinService
    ) {}

  createUserPin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPin = await this.userPinService.createUserPin(req.body);
      res.status(201).json({
        status: 'success',
        message: 'User PIN created successfully',
        data: userPin,
      });
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating user Pin' });
      }
    }
  };

  updateUserPin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPin = await this.userPinService.updateUserPin((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'User PIN updated successfully',
        data: userPin,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPin not found' });
      }
    }
  };

  getUserPin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPin = await this.userPinService.getUserPinById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'User PIN fetched successfully',
        data: userPin,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPin not found' });
      }
    }
  };

  deleteUserPin = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userPinService.deleteUserPin(req.params.id);
      res.status(200).json({ status: 'success', message: 'UserPin deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'UserPin not found' });
      }
    }
  };

}