import { StickerUser } from '../../entities/StickerUser';

export interface IStickerUserRepository {
  findById(id: string): Promise<StickerUser | null>;
  findByStickerId(stickerId: string): Promise<StickerUser | null>;
  findByUserId(userid: string): Promise<StickerUser | null>;
  findAllByUserId(userid: string): Promise<StickerUser[]>;
  create(StickerUser: Partial<StickerUser>): Promise<StickerUser>;
  update(id: string, stickerUser: Partial<StickerUser>): Promise<StickerUser>;
  delete(id: string): Promise<void>;
}