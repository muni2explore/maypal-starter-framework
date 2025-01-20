import { Router } from 'express';
import { container } from '../di/container';  // Import from our container file
import { TYPES } from '../di/types';
import { UserProfileController } from '../controllers/UserProfileController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/auth';
import { CreateUserProfileSchema, UpdateUserProfileSchema, LoginUserProfileSchema } from '../types';

const router = Router();

// Resolve the controller using the symbol
const userProfileController = container.resolve<UserProfileController>(TYPES.UserProfileController);

router.post('/register',
    authMiddleware,
    validateRequest(CreateUserProfileSchema),
    (req, res) => userProfileController.createUserProfile(req, res)
);

router.get('/:id',
    (req, res) => userProfileController.getUserProfile(req, res)
);

router.put('/:id',
    validateRequest(UpdateUserProfileSchema),
    (req, res) => userProfileController.updateUserProfile(req, res)
);

router.delete('/:id',
    (req, res) => userProfileController.deleteUserProfile(req, res)
);

router.post('/login',
    authMiddleware,  
    validateRequest(LoginUserProfileSchema),
    (req, res) => userProfileController.loginUserProfile(req, res)
);

export default router;