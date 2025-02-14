import { StickerSchedule } from '../../entities/StickerSchedule';

export interface IStickerScheduleRepository {
  findById(id: string): Promise<StickerSchedule | null>;
  findByStickerId(stickerId: string): Promise<StickerSchedule | null>;
  create(stickerSchedule: Partial<StickerSchedule>): Promise<StickerSchedule>;
  update(id: string, StickerSchedule: Partial<StickerSchedule>): Promise<StickerSchedule>;
  delete(id: string): Promise<void>;
}