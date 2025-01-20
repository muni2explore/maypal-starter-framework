import { Router } from 'express';
import { container } from '../di/container';  // Import from our container file
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { UserPinHistoryController } from '../controllers/UserPinHistoryController';
import { CreateUserPinHistorySchema, UpdateUserPinHistorySchema } from '../types';

const router = Router();

// Resolve the controller using the symbol
const userPinHistoryController = container.resolve<UserPinHistoryController>(TYPES.UserPinHistoryController);

router.post('/create',
    validateRequest(CreateUserPinHistorySchema),
    (req, res) => userPinHistoryController.createUserPinHistory(req, res)
);

router.get('/:id',
    (req, res) => userPinHistoryController.getUserPinHistory(req, res)
);

router.put('/:id',
    validateRequest(UpdateUserPinHistorySchema),
    (req, res) => userPinHistoryController.updateUserPinHistory(req, res)
);

router.delete('/:id',
    (req, res) => userPinHistoryController.deleteUserPinHistory(req, res)
);



export default router;