
import { StickerSchedule } from '../../entities/StickerSchedule';

export interface CreateStickerScheduleDTO {
  id: string;
  stickerId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isEnabledToConnect?: boolean;
  isScheduleActive?: boolean;
  createdBy: string;
  createOn?: Date;
  modifiedBy: string;
  modifiedOn?: Date;
}

export interface UpdateStickerScheduleDTO {
  stickerId?: string;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  isEnabledToConnect?: boolean;
  isScheduleActive?: boolean;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export interface IStickerScheduleService {
  createStickerSchedule(data: CreateStickerScheduleDTO): Promise<StickerSchedule>;
  updateStickerSchedule(id: string, data: UpdateStickerScheduleDTO): Promise<StickerSchedule>;
  getStickerScheduleById(id: string): Promise<StickerSchedule>;
  getStickerScheduleByStickerId(stickerId: string): Promise<StickerSchedule>;
  deleteStickerSchedule(id: string): Promise<void>;
}