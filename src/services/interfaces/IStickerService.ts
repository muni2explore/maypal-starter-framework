
import { Sticker } from '../../entities/Sticker';

export interface CreateStickerDTO {
  id: string;
  type: number;
  isActive?: boolean;
  stickerCode: string;
  status: number;
  createdBy: string;
}

export interface UpdateStickerDTO {
  type?: number;
  isActive?: boolean;
  stickerCode?: string;
  status?: number;
  modifiedBy?: string;
}

export interface IStickerService {
  createSticker(data: CreateStickerDTO): Promise<Sticker>;
  updateSticker(id: string, data: UpdateStickerDTO): Promise<Sticker>;
  getStickerById(id: string): Promise<Sticker>;
  getStickerByCode(stickerCode: string): Promise<Sticker>;
  deleteSticker(id: string): Promise<void>;
}