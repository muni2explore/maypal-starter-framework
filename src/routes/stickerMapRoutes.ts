import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerMapController } from '../controllers/StickerMapController';
import { CreateStickerMapSchema, UpdateStickerMapSchema } from '../types';

const router = Router();

const stickerMapController = container.resolve<StickerMapController>(TYPES.StickerMapController);

router.post('/create',
    validateRequest(CreateStickerMapSchema),
    (req, res) => stickerMapController.createStickerMap(req, res)
);

router.get('/:id',
    (req, res) => stickerMapController.getStickerMap(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerMapSchema),
    (req, res) => stickerMapController.updateStickerMap(req, res)
);

router.delete('/:id',
    (req, res) => stickerMapController.deleteStickerMap(req, res)
);



export default router;