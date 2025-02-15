import { Router } from 'express';
import { container } from '../di/container';  // Import from our container file
import { TYPES } from '../di/types';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/auth';
import { CreateUserSchema, UpdateUserSchema, LoginUserSchema } from '../types';

const router = Router();

// Resolve the controller using the symbol
const userController = container.resolve<UserController>(TYPES.UserController);

router.post('/register',
    validateRequest(CreateUserSchema),
    (req, res) => userController.createUser(req, res)
);

router.get('/:id',
    authMiddleware,
    (req, res) => userController.getUser(req, res)
);

router.put('/:id',
    authMiddleware,
    validateRequest(UpdateUserSchema),
    (req, res) => userController.updateUser(req, res)
);

router.delete('/:id',
    authMiddleware,
    (req, res) => userController.deleteUser(req, res)
);

router.post('/login',  
    validateRequest(LoginUserSchema),
    (req, res) => userController.loginUser(req, res)
);

router.put('/:id/deactivate',
    authMiddleware,
    (req, res) => userController.deactivateUser(req, res) 
);

export default router;