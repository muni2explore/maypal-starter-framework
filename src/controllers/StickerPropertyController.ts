import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerPropertyService } from '../services/interfaces/IStickerPropertyService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerPropertyController {
    constructor(
        @inject(TYPES.StickerPropertyService)
        private stickerPropertyService: IStickerPropertyService
    ) {}

  createStickerProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerProperty = await this.stickerPropertyService.createStickerProperty(req.body);
      res.status(201).json({
        status: 'success',
        message: 'StickerProperty created successfully',
        data: stickerProperty,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating StickerProperty' });
      }
    }
  };

  updateStickerProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerProperty = await this.stickerPropertyService.updateStickerProperty((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'StickerProperty Updated successfully',
        data: stickerProperty,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerProperty not found' });
      }
    }
  };

  getStickerProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerProperty = await this.stickerPropertyService.getStickerPropertyById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'StickerProperty fetched successfully',
        data: stickerProperty,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerProperty not found' });
      }
    }
  };

  deleteStickerProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerPropertyService.deleteStickerProperty(req.params.id);
      res.status(200).json({ status: 'success', message: 'StickerProperty deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerProperty not found' });
      }
    }
  };

}