import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IContactUsService } from '../services/interfaces/IContactUsService';
import { TYPES } from '../di/types';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class ContactUsController {
    constructor(
        @inject(TYPES.ContactUsService)
        private contactUsService: IContactUsService
    ) {}

  createContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactUs = await this.contactUsService.createContactUs(req.body);
      res.status(201).json({
        status: 'success',
        message: 'ContactUs created successfully',
        data: contactUs,
      });
    } catch (error: any) { 
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating ContactUs' });
      }
    }
  };

  updateContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactUs = await this.contactUsService.updateContactUs((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'ContactUs Updated successfully',
        data: contactUs,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'ContactUs not found' });
      }
    }
  };

  getContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactUs = await this.contactUsService.getContactUsById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'ContactUs fetched successfully',
        data: contactUs,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'ContactUs not found' });
      }
    }
  };

  deleteContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.contactUsService.deleteContactUs(req.params.id);
      res.status(200).json({ status: 'success', message: 'ContactUs deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'ContactUs not found' });
      }
    }
  };

}