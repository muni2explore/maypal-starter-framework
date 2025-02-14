import { Router } from 'express';
import { container } from '../di/container';  // Import from our container file
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { VerificationCodeController } from '../controllers/VerificationCodeController';
import { CreateVerificationCodeSchema, UpdateVerificationCodeSchema } from '../types';

const router = Router();

// Resolve the controller using the symbol
const verificationCodeController = container.resolve<VerificationCodeController>(TYPES.VerificationCodeController);

router.post('/create',
    validateRequest(CreateVerificationCodeSchema),
    (req, res) => verificationCodeController.createVerificationCode(req, res)
);

router.get('/:id',
    (req, res) => verificationCodeController.getVerificationCode(req, res)
);

router.put('/:id',
    validateRequest(UpdateVerificationCodeSchema),
    (req, res) => verificationCodeController.updateVerificationCode(req, res)
);

router.delete('/:id',
    (req, res) => verificationCodeController.deleteVerificationCode(req, res)
);



export default router;