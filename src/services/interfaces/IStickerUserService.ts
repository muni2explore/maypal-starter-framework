
import { StickerUser } from '../../entities/StickerUser';

export interface CreateStickerUserDTO {
  id: string;
  stickerId: string;
  userTypeId: number;
  userDescription: string;
  mapId: string;
  userId: string;
  isActive?: boolean;
  statusId: number;
  createdBy: string;
  createOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export interface StickerUserSummary {
isActive: boolean;
    mapCode: string | null;
    stickerProperties: {
        maximumUsers: number;
        stickerItemType: string;
        stickerCallType: string;
    } | null;
    stickerItemType: string;
}

export interface UpdateStickerUserDTO {
  stickerId?: string;
  userTypeId?: number;
  userDescription?: string;
  mapId?: string;
  userId?: string;
  isActive?: boolean;
  statusId?: number;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export interface IStickerUserService {
  createStickerUser(data: CreateStickerUserDTO): Promise<StickerUser>;
  updateStickerUser(id: string, data: UpdateStickerUserDTO): Promise<StickerUser>;
  getStickerUserById(id: string): Promise<StickerUser>;
  deleteStickerUser(id: string): Promise<void>;
  getAllStickersForUser(userId: string): Promise<StickerUserSummary[]>;
}