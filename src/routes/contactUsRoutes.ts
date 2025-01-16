import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { ContactUsController } from '../controllers/ContactUsController';
import { CreateContactUsSchema, UpdateContactUsSchema } from '../types';

const router = Router();

const contactUsController = container.resolve<ContactUsController>(TYPES.ContactUsController);

router.post('/create',
    validateRequest(CreateContactUsSchema),
    (req, res) => contactUsController.createContactUs(req, res)
);

router.get('/:id',
    (req, res) => contactUsController.getContactUs(req, res)
);

router.put('/:id',
    validateRequest(UpdateContactUsSchema),
    (req, res) => contactUsController.updateContactUs(req, res)
);

router.delete('/:id',
    (req, res) => contactUsController.deleteContactUs(req, res)
);



export default router;