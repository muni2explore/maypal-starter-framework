import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IUserTypeService } from '../services/interfaces/IUserTypeService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class UserTypeController {
    constructor(
        @inject(TYPES.UserTypeService)
        private userTypeService: IUserTypeService
    ) {}

  createUserType = async (req: Request, res: Response): Promise<void> => {
    try {
      const userType = await this.userTypeService.createUserType(req.body);
      res.status(201).json(userType);
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message || 'Error creating user' });
      }
    }
  };

  updateUserType = async (req: Request, res: Response): Promise<void> => {
    try {
      const userType = await this.userTypeService.updateUserType(Number(req.params.int), req.body);
      res.json(userType);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'UserType not found' });
      }
    }
  };

  getUserType = async (req: Request, res: Response): Promise<void> => {
    try {
      const userType = await this.userTypeService.getUserTypeByInt(Number(req.params.int));
      res.json(userType);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'UserType not found' });
      }
    }
  };

  deleteUserType = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userTypeService.deleteUserType(Number(req.params.int));
      res.status(200).json({ message: 'UserType deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'UserType not found' });
      }
    }
  };
}