import { StickerMap } from '../../entities/StickerMap';

export interface IStickerMapRepository {
  findById(id: string): Promise<StickerMap | null>;
  findByMapCode(mapCode: string): Promise<StickerMap | null>;
  create(stickerMap: Partial<StickerMap>): Promise<StickerMap>;
  update(id: string, stickerMap: Partial<StickerMap>): Promise<StickerMap>;
  delete(id: string): Promise<void>;
}