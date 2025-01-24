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

router.get('/:id',
    (req, res) => userTypeController.getUserType(req, res)
);

router.put('/:id',
    validateRequest(UpdateUserTypeSchema),
    (req, res) => userTypeController.updateUserType(req, res)
);

router.delete('/:id',
    (req, res) => userTypeController.deleteUserType(req, res)
);


export default router;