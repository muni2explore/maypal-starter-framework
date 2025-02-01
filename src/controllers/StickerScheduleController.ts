import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IStickerScheduleService } from '../services/interfaces/IStickerScheduleService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class StickerScheduleController {
    constructor(
        @inject(TYPES.StickerScheduleService)
        private stickerScheduleService: IStickerScheduleService
    ) {}

  createStickerSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerSchedule = await this.stickerScheduleService.createStickerSchedule(req.body);
      res.status(201).json({
        status: 'success',
        message: 'StickerSchedule created successfully',
        data: stickerSchedule,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating StickerSchedule' });
      }
    }
  };

  updateStickerSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerSchedule = await this.stickerScheduleService.updateStickerSchedule((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'StickerSchedule Updated successfully',
        data: stickerSchedule,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerSchedule not found' });
      }
    }
  };

  getStickerSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      const stickerSchedule = await this.stickerScheduleService.getStickerScheduleById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'StickerSchedule fetched successfully',
        data: stickerSchedule,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerSchedule not found' });
      }
    }
  };

  deleteStickerSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stickerScheduleService.deleteStickerSchedule(req.params.id);
      res.status(200).json({ status: 'success', message: 'StickerSchedule deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'StickerSchedule not found' });
      }
    }
  };

}