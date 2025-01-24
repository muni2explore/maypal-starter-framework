import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerService } from '../services/interfaces/IStickerService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerController {
    constructor(
        @inject(TYPES.StickerService)
        private stickerService: IStickerService
    ) {}

  createSticker = async (req: Request, res: Response): Promise<void> => {
    try {
      const sticker = await this.stickerService.createSticker(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Sticker created successfully',
        data: sticker,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating Sticker' });
      }
    }
  };

  updateSticker = async (req: Request, res: Response): Promise<void> => {
    try {
      const sticker = await this.stickerService.updateSticker((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'Sticker Updated successfully',
        data: sticker,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'Sticker not found' });
      }
    }
  };

  getSticker = async (req: Request, res: Response): Promise<void> => {
    try {
      const sticker = await this.stickerService.getStickerById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Sticker fetched successfully',
        data: sticker,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'Sticker not found' });
      }
    }
  };

  deleteSticker = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerService.deleteSticker(req.params.id);
      res.status(200).json({ status: 'success', message: 'Sticker deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'Sticker not found' });
      }
    }
  };

}