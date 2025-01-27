import { StickerProperty } from '../../entities/StickerProperty';

export interface IStickerPropertyRepository {
  findById(id: string): Promise<StickerProperty | null>;
  findByPin(stickerPin: string): Promise<StickerProperty | null>;
  create(stickerProperty: Partial<StickerProperty>): Promise<StickerProperty>;
  update(id: string, stickerProperty: Partial<StickerProperty>): Promise<StickerProperty>;
  delete(id: string): Promise<void>;
}