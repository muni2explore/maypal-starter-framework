
import { StickerMap } from '../../entities/StickerMap';

export interface CreateStickerMapDTO {
  id: string;
  mapCode: string;
  stickerId: string;
}

export interface UpdateStickerMapDTO {
  mapCode?: string;
  stickerId?: string;
}

export interface IStickerMapService {
  createStickerMap(data: CreateStickerMapDTO): Promise<StickerMap>;
  updateStickerMap(id: string, data: UpdateStickerMapDTO): Promise<StickerMap>;
  getStickerMapById(id: string): Promise<StickerMap>;
  getStickerMapByMapCode(mapCode: string): Promise<StickerMap>;
  deleteStickerMap(id: string): Promise<void>;
}