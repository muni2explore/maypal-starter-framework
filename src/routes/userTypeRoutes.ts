import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { UserTypeController } from '../controllers/UserTypeController';
import { validateRequest } from '../middlewares/validateRequest';
import { CreateUserTypeSchema, UpdateUserTypeSchema } from '../types';

const router = Router();

const userTypeController = container.resolve<UserTypeController>(TYPES.UserTypeController);

router.post('/create',
    validateRequest(CreateUserTypeSchema),
    (req, res) => userTypeController.createUserType(req, res)
);

router.get('/:int',
    (req, res) => userTypeController.getUserType(req, res)
);

router.put('/:int',
    validateRequest(UpdateUserTypeSchema),
    (req, res) => userTypeController.updateUserType(req, res)
);

router.delete('/:int',
    (req, res) => userTypeController.deleteUserType(req, res)
);


export default router;