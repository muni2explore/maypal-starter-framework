import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IUserService } from '../services/interfaces/IUserService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';
import { generateToken } from '../utils/jwt';

@injectable()
export class UserController {
    constructor(
        @inject(TYPES.UserService)
        private userService: IUserService
    ) {}

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: user,
      });
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating user' });
      }
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'User Updated successfully',
        data: user,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'User not found' });
      }
    }
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserByUserId(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'User not found' });
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(200).json({ status: 'success', message: 'User deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'User not found' });
      }
    }
  };
  
  deactivateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await this.userService.deactivateUser(req.params.id);
        res.status(200).json({ status: 'success', message: 'User status updated to Inactive' });
    } catch (error: any) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(404).json({ status: 'fail', message: error.message || 'User not found' });
        }
    }
  }

  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { phoneNumber } = req.body;
      const user = await this.userService.getUserByPhoneNumber(phoneNumber);

      const token = generateToken(user.userid);  

      res.status(200).json({ status: 'success', message: 'Login successful', data: token }); 
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ status: 'fail',message: 'Error logging in' });
      }
    }
  };
}