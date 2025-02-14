import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerPropertyController } from '../controllers/StickerPropertyController';
import { CreateStickerPropertySchema, UpdateStickerPropertySchema } from '../types';

const router = Router();

const stickerPropertyController = container.resolve<StickerPropertyController>(TYPES.StickerPropertyController);

router.post('/create',
    validateRequest(CreateStickerPropertySchema),
    (req, res) => stickerPropertyController.createStickerProperty(req, res)
);

router.get('/:id',
    (req, res) => stickerPropertyController.getStickerProperty(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerPropertySchema),
    (req, res) => stickerPropertyController.updateStickerProperty(req, res)
);

router.delete('/:id',
    (req, res) => stickerPropertyController.deleteStickerProperty(req, res)
);



export default router;