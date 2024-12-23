import { Router } from 'express';
import userRoutes from './userRoutes';
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

// 404 handler for undefined routes
router.use('*', (req, res) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

export default router;