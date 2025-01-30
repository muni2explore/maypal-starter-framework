import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerUserService } from '../services/interfaces/IStickerUserService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerUserController {
    constructor(
        @inject(TYPES.StickerUserService)
        private stickerUserService: IStickerUserService
    ) {}

  createStickerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerUser = await this.stickerUserService.createStickerUser(req.body);
      res.status(201).json({
        status: 'success',
        message: 'StickerUser created successfully',
        data: stickerUser,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating StickerUser' });
      }
    }
  };

  updateStickerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerUser = await this.stickerUserService.updateStickerUser((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'StickerUser Updated successfully',
        data: stickerUser,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerUser not found' });
      }
    }
  };

  getStickerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerUser = await this.stickerUserService.getStickerUserById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'StickerUser fetched successfully',
        data: stickerUser,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerUser not found' });
      }
    }
  };

  deleteStickerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerUserService.deleteStickerUser(req.params.id);
      res.status(200).json({ status: 'success', message: 'StickerUser deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerUser not found' });
      }
    }
  };

    getAllStickersForUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const stickerUsers = await this.stickerUserService.getAllStickersForUser(req.params.userId);
            res.status(200).json({
                status: 'success',
                message: 'StickerUser records fetched successfully',
                data: stickerUsers,
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(404).json({ status: 'fail', message: error.message || 'StickerUser records not found' });
            }
        }
    }; 

}