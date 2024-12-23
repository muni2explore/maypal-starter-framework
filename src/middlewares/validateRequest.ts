
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppError } from './errorHandler';
import { ValidationErrorDetail } from '@/types';

export const validateRequest = (schema: new () => any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(schema, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const validationErrors: ValidationErrorDetail[] = errors.map(error => ({
          property: error.property,
          constraints: error.constraints
        }));

        next(new AppError({
          statusCode: 400,
          message: 'Validation failed',
          details: validationErrors
        }));
        return;
      }

      req.body = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
};