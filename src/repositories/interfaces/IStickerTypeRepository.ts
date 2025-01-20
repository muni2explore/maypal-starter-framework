import { StickerType } from '../../entities/StickerType';

export interface IStickerTypeRepository {
  findById(id: number): Promise<StickerType | null>;
  findByType(type: string): Promise<StickerType | null>;
  create(stickerType: Partial<StickerType>): Promise<StickerType>;
  update(id: number, stickerType: Partial<StickerType>): Promise<StickerType>;
  delete(id: number): Promise<void>;
}