import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

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

    // Add your JWT verification logic here
    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user = decoded;

    next();
  } catch (error) {
    next(new AppError({statusCode: 401, message: 'Invalid or expired token'}));
  }
};
