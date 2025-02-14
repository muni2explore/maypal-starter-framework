import { Router } from 'express';
import { container } from '../di/container';  
import { TYPES } from '../di/types';
import { validateRequest } from '../middlewares/validateRequest';
import { StickerScheduleController } from '../controllers/StickerScheduleController';
import { CreateStickerScheduleSchema, UpdateStickerScheduleSchema } from '../types';

const router = Router();

const stickerScheduleController = container.resolve<StickerScheduleController>(TYPES.StickerScheduleController);

router.post('/create',
    validateRequest(CreateStickerScheduleSchema),
    (req, res) => stickerScheduleController.createStickerSchedule(req, res)
);

router.get('/:id',
    (req, res) => stickerScheduleController.getStickerSchedule(req, res)
);

router.put('/:id',
    validateRequest(UpdateStickerScheduleSchema),
    (req, res) => stickerScheduleController.updateStickerSchedule(req, res)
);

router.delete('/:id',
    (req, res) => stickerScheduleController.deleteStickerSchedule(req, res)
);



export default router;