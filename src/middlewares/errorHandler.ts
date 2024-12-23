import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';
import { IAppError, ValidationErrorDetail } from '@/types';

// Custom error class for application errors
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: ValidationErrorDetail[] | string;
  
    constructor({
      statusCode,
      message,
      details,
      isOperational = true
    }: IAppError) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.details = details;
      
      Object.setPrototypeOf(this, AppError.prototype);
      Error.captureStackTrace(this, this.constructor);
    }
  }

// Error types enum for consistent error handling
export enum ErrorTypes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER = 'INTERNAL_SERVER',
}

// Interface for structured error responses
interface ErrorResponse {
  status: string;
  message: string;
  error?: string;
  details?: any;
  stack?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let errorResponse: ErrorResponse = {
    status: 'error',
    message: err.message || 'Something went wrong'
  };

  // Log error
  logger.error('Error:', {
    error: err,
    requestInfo: {
      method: req.method,
      path: req.path,
      body: req.body,
      query: req.query,
      params: req.params,
    }
  });

  // Handle different types of errors
  if (err instanceof AppError) {
    errorResponse.status = 'fail';
    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle TypeORM errors
  if (err instanceof QueryFailedError) {
    errorResponse.status = 'error';
    errorResponse.message = 'Database operation failed';
    errorResponse.error = ErrorTypes.DATABASE_ERROR;
    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = err.message;
    }
    return res.status(500).json(errorResponse);
  }

  // Handle validation errors
  if (err instanceof ValidationError || err.name === 'ValidationError') {
    errorResponse.status = 'fail';
    errorResponse.message = 'Validation failed';
    errorResponse.error = ErrorTypes.VALIDATION_ERROR;
    errorResponse.details = err.message;
    return res.status(400).json(errorResponse);
  }

  // If error isn't operational (i.e., programming error), send generic message in production
  if (!isOperationalError(err)) {
    errorResponse = {
      status: 'error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong' 
        : err.message
    };
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Default to 500 internal server error
  return res.status(500).json(errorResponse);
};

// Helper function to determine if error is operational
const isOperationalError = (err: Error): boolean => {
  if (err instanceof AppError) {
    return err.isOperational;
  }
  return false;
};