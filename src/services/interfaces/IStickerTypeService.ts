
import { StickerType } from '../../entities/StickerType';

export interface CreateStickerTypeDTO {
  type: string;
}

export interface UpdateStickerTypeDTO {
  type: string;
}

export interface IStickerTypeService {
  createStickerType(data: CreateStickerTypeDTO): Promise<StickerType>;
  updateStickerType(id: number, data: UpdateStickerTypeDTO): Promise<StickerType>;
  getStickerTypeById(id: number): Promise<StickerType>;
  getStickerTypeByType(type: string): Promise<StickerType>;
  deleteStickerType(id: number): Promise<void>;
}