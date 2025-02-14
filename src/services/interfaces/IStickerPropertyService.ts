
import { StickerProperty } from '../../entities/StickerProperty';

export interface CreateStickerPropertyDTO {
  id: string;
  stickerName: string;
  stickerId: string;
  maximumUsers: number;
  stickerPin: string;
  itemTypeId: number;
  callTypeId: number;
  helpText1?: string;
  helpText2?: string;
  automaticReply: string;
  createdBy: string;
}

export interface UpdateStickerPropertyDTO {
  stickerName?: string;
  stickerId?: string;
  maximumUsers?: number;
  stickerPin?: string;
  itemTypeId?: number;
  callTypeId?: number;
  helpText1?: string;
  helpText2?: string;
  automaticReply?: string;
  modifiedBy?: string;
}


export interface IStickerPropertyService {
  createStickerProperty(data: CreateStickerPropertyDTO): Promise<StickerProperty>;
  updateStickerProperty(id: string, data: UpdateStickerPropertyDTO): Promise<StickerProperty>;
  getStickerPropertyById(id: string): Promise<StickerProperty>;
  getStickerPropertyByPin(stickerPin: string): Promise<StickerProperty>;
  deleteStickerProperty(id: string): Promise<void>;
}