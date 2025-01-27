
import { Sticker } from '../../entities/Sticker';

export interface CreateStickerDTO {
  id: string;
  stickerTypeId: number;
  isActive?: boolean;
  stickerCode: string;
  stickerStatusId: number;
  createdBy: string;
}

export interface UpdateStickerDTO {
  stickerTypeId?: number;
  isActive?: boolean;
  stickerCode?: string;
  stickerStatusId?: number;
  modifiedBy?: string;
}

export interface IStickerService {
  createSticker(data: CreateStickerDTO): Promise<Sticker>;
  updateSticker(id: string, data: UpdateStickerDTO): Promise<Sticker>;
  getStickerById(id: string): Promise<Sticker>;
  getStickerByCode(stickerCode: string): Promise<Sticker>;
  deleteSticker(id: string): Promise<void>;
}