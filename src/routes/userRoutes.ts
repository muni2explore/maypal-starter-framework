import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth';
import { CreateUserSchema, UpdateUserSchema } from '../types';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();
const userController = container.resolve(UserController);

router.post('/',
  validateRequest(CreateUserSchema),
  userController.createUser
);

router.get('/:id',
  authMiddleware,
  userController.getUser
);

router.put('/:id',
  authMiddleware,
  validateRequest(UpdateUserSchema),
  userController.updateUser
);

router.delete('/:id',
  authMiddleware,
  userController.deleteUser
);

export default router;