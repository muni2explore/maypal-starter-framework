import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IUserService } from '../services/interfaces/IUserService';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class UserController {
  constructor(
    @inject('UserService')
    private userService: IUserService
  ) {}

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message || 'Error creating user' });
      }
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser(Number(req.params.id), req.body);
      res.json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'User not found' });
      }
    }
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'User not found' });
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ message: error.message || 'User not found' });
      }
    }
  };
}