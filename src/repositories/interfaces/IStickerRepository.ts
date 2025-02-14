import { Sticker } from '../../entities/Sticker';

export interface IStickerRepository {
  findById(id: string): Promise<Sticker | null>;
  findByStickerCode(stickerCode: string): Promise<Sticker | null>;
  create(sticker: Partial<Sticker>): Promise<Sticker>;
  update(id: string, Sticker: Partial<Sticker>): Promise<Sticker>;
  delete(id: string): Promise<void>;
}