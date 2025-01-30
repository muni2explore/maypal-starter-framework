import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerUserController } from '../controllers/StickerUserController';
import { CreateStickerUserSchema, UpdateStickerUserSchema } from '../types';

const router = Router();

const stickerUserController = container.resolve<StickerUserController>(TYPES.StickerUserController);

router.post('/create',
    validateRequest(CreateStickerUserSchema),
    (req, res) => stickerUserController.createStickerUser(req, res)
);

router.get('/:id',
    (req, res) => stickerUserController.getStickerUser(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerUserSchema),
    (req, res) => stickerUserController.updateStickerUser(req, res)
);

router.delete('/:id',
    (req, res) => stickerUserController.deleteStickerUser(req, res)
);

router.get('/stickers/:userId',
    (req, res) => stickerUserController.getAllStickersForUser(req, res)
);



export default router;