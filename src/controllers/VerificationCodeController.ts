import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { TYPES } from '../di/types';
import { IVerificationCodeService } from '../services/interfaces/IVerificationCodeService';
import { AppError } from '../middlewares/errorHandler';

@injectable()
export class VerificationCodeController {
    constructor(
        @inject(TYPES.VerificationCodeService)
        private verificationCodeService: IVerificationCodeService
    ) {}

  createVerificationCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const verificationCode = await this.verificationCodeService.createVerificationCode(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Verification Code created successfully',
        data: verificationCode,
      });
    } catch (error: any) { // Type error as 'any' to access message
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(400).json({ status: 'fail', message: error.message || 'Error creating Verification Code' });
      }
    }
  };

  updateVerificationCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const verificationCode = await this.verificationCodeService.updateVerificationCode((req.params.id), req.body);
      res.status(200).json({
        status: 'success',
        message: 'Verification Code updated successfully',
        data: verificationCode,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'VerificationCode not found' });
      }
    }
  };

  getVerificationCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const verificationCode = await this.verificationCodeService.getVerificationCodeById(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Verification Code fetched successfully',
        data: verificationCode,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'VerificationCode not found' });
      }
    }
  };

  deleteVerificationCode = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.verificationCodeService.deleteVerificationCode(req.params.id);
      res.status(200).json({ status: 'success', message: 'VerificationCode deleted successfully' });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(404).json({ status: 'fail', message: error.message || 'VerificationCode not found' });
      }
    }
  };

}