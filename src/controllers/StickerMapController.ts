import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerMapService } from '../services/interfaces/IStickerMapService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerMapController {
    constructor(
        @inject(TYPES.StickerMapService)
        private stickerMapService: IStickerMapService
    ) {}

  createStickerMap = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerMap = await this.stickerMapService.createStickerMap(req.body);
      res.status(201).json({
        status: 'success',
        message: 'StickerMap created successfully',
        data: stickerMap,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating StickerMap' });
      }
    }
  };

  updateStickerMap = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerMap = await this.stickerMapService.updateStickerMap((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'StickerMap Updated successfully',
        data: stickerMap,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerMap not found' });
      }
    }
  };

  getStickerMap = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerMap = await this.stickerMapService.getStickerMapById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'StickerMap fetched successfully',
        data: stickerMap,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerMap not found' });
      }
    }
  };

  deleteStickerMap = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerMapService.deleteStickerMap(req.params.id);
      res.status(200).json({ status: 'success', message: 'StickerMap deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerMap not found' });
      }
    }
  };

}