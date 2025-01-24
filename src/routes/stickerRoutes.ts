import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerController } from '../controllers/StickerController';
import { CreateStickerSchema, UpdateStickerSchema } from '../types';

const router = Router();

const stickerController = container.resolve<StickerController>(TYPES.StickerController);

router.post('/create',
    validateRequest(CreateStickerSchema),
    (req, res) => stickerController.createSticker(req, res)
);

router.get('/:id',
    (req, res) => stickerController.getSticker(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerSchema),
    (req, res) => stickerController.updateSticker(req, res)
);

router.delete('/:id',
    (req, res) => stickerController.deleteSticker(req, res)
);



export default router;