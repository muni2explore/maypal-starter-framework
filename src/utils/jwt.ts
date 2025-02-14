import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;  

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });  
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);  
  } catch (error) {
    const err = error as Error;  

    if (err.name === 'TokenExpiredError') {
      throw new Error('Token has expired, please log in again');
    }
    throw new Error('Invalid token');
  }
};
