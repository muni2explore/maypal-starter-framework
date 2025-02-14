import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerTypeController } from '../controllers/StickerTypeController';
import { CreateStickerTypeSchema, UpdateStickerTypeSchema } from '../types';

const router = Router();

const stickerTypeController = container.resolve<StickerTypeController>(TYPES.StickerTypeController);

router.post('/create',
    validateRequest(CreateStickerTypeSchema),
    (req, res) => stickerTypeController.createStickerType(req, res)
);

router.get('/:id',
    (req, res) => stickerTypeController.getStickerType(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerTypeSchema),
    (req, res) => stickerTypeController.updateStickerType(req, res)
);

router.delete('/:id',
    (req, res) => stickerTypeController.deleteStickerType(req, res)
);



export default router;