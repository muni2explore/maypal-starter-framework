import { Router } from 'express';
import userRoutes from './userRoutes';
import userTypeRoutes from './userTypeRoutes';
import userProfileRoutes from './userProfileRoutes';
import userPinRoutes from './userPinRoutes';
import userPinHistoryRoutes from './userPinHistoryRoutes';
import verificationCodeRoutes from './verificationCodeRoutes';
import contactUsRoutes from './contactUsRoutes';
import stickerTypeRoutes from './stickerTypeRoutes';
import stickerRoutes from './stickerRoutes';
import stickerPropertyRoutes from './stickerPropertyRoutes';
import stickerMapRoutes from './stickerMapRoutes';
import stickerUserRoutes from './stickerUserRoutes';


import { logger } from '../utils/logger';

const router = Router();

// Health check route
router.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

// API version prefix
const API_PREFIX = '/api/v1';

// Register routes
router.use(`${API_PREFIX}/users`, userRoutes);
router.use(`${API_PREFIX}/userTypes`, userTypeRoutes);
router.use(`${API_PREFIX}/userProfile`, userProfileRoutes);
router.use(`${API_PREFIX}/userPin`, userPinRoutes);
router.use(`${API_PREFIX}/userPinHistory`, userPinHistoryRoutes);
router.use(`${API_PREFIX}/verificationCode`, verificationCodeRoutes);
router.use(`${API_PREFIX}/contactUs`, contactUsRoutes);
router.use(`${API_PREFIX}/stickerType`, stickerTypeRoutes);
router.use(`${API_PREFIX}/stickers`, stickerRoutes);
router.use(`${API_PREFIX}/stickerProperty`, stickerPropertyRoutes);
router.use(`${API_PREFIX}/stickerMap`, stickerMapRoutes);
router.use(`${API_PREFIX}/stickerUser`, stickerUserRoutes);


// 404 handler for undefined routes
router.use('*', (req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

export default router;