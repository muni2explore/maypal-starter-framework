import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './errorHandler';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { userId: string };  
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError({statusCode: 401, message: 'No authentication token provided'});
    }
    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);  

    req.user = { userId: (decoded as JwtPayload).id };


    next();
  } catch (error) {
    next(new AppError({statusCode: 401, message: 'Invalid or expired token'}));
  }
};
