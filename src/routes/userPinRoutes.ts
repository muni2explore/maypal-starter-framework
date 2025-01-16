import { Router } from 'express';
import { container } from '../di/container';  // Import from our container file
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { UserPinController } from '../controllers/UserPinController';
import { CreateUserPinSchema, UpdateUserPinSchema } from '../types';

const router = Router();

// Resolve the controller using the symbol
const userPinController = container.resolve<UserPinController>(TYPES.UserPinController);

router.post('/create',
    validateRequest(CreateUserPinSchema),
    (req, res) => userPinController.createUserPin(req, res)
);

router.get('/:id',
    (req, res) => userPinController.getUserPin(req, res)
);

router.put('/:id',
    validateRequest(UpdateUserPinSchema),
    (req, res) => userPinController.updateUserPin(req, res)
);

router.delete('/:id',
    (req, res) => userPinController.deleteUserPin(req, res)
);



export default router;