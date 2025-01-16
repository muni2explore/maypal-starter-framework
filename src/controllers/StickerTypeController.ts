import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerTypeService } from '../services/interfaces/IStickerTypeService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerTypeController {
    constructor(
        @inject(TYPES.StickerTypeService)
        private stickerTypeService: IStickerTypeService
    ) {}

  createStickerType = async (req: Request, res: Response): Promise<void> => {
    try {
      const StickerType = await this.stickerTypeService.createStickerType(req.body);
        res.status(201).json({
          status: 'success',
          message: 'StickerType created successfully',
          data: StickerType,
        });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating user' });
      }
    }
  };

  updateStickerType = async (req: Request, res: Response): Promise<void> => {
    try {
      const StickerType = await this.stickerTypeService.updateStickerType(Number(req.params.id), req.body);
        res.status(200).json({
          status: 'success',
          message: 'StickerType updated successfully',
          data: StickerType,
        });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerType not found' });
      }
    }
  };

  getStickerType = async (req: Request, res: Response): Promise<void> => {
    try {
      const StickerType = await this.stickerTypeService.getStickerTypeById(Number(req.params.id));
        res.status(200).json({
          status: 'success',
          message: 'StickerType fetched successfully',
          data: StickerType,
        });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerType not found' });
      }
    }
  };

  deleteStickerType = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerTypeService.deleteStickerType(Number(req.params.id));
      res.status(200).json({ status: 'success', message: 'StickerType deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerType not found' });
      }
    }
  };
}