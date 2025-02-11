import { injectable, inject } from 'tsyringe';
import { IStickerUserService, CreateStickerUserDTO, UpdateStickerUserDTO, StickerUserSummary } from './interfaces/IStickerUserService';
import { IStickerUserRepository } from '../repositories/interfaces/IStickerUserRepository';
import { StickerUser } from '../entities/StickerUser';
import { TYPES } from '../di/types';

@injectable()
export class StickerUserService implements IStickerUserService {
    constructor(
        @inject(TYPES.StickerUserRepository)
        private stickerUserRepository: IStickerUserRepository
    ) {}

  async createStickerUser(data: CreateStickerUserDTO): Promise<StickerUser> {
    const existingStickerUserSticker = await this.stickerUserRepository.findByStickerId(data.stickerId);
    const existingStickerUserId = await this.stickerUserRepository.findByUserId(data.userId);
    if (existingStickerUserSticker && existingStickerUserId) {
    throw new Error('StickerUser with this Sticker and userId already exists');
    }
    return this.stickerUserRepository.create(data);
  }

  async updateStickerUser(id: string, data: UpdateStickerUserDTO): Promise<StickerUser> {
    const StickerUser = await this.stickerUserRepository.findById(id);
    if (!StickerUser) {
      throw new Error('StickerUser not found');
    }
    return this.stickerUserRepository.update(id, data);
  }

  async getStickerUserById(id: string): Promise<StickerUser> {
    const StickerUser = await this.stickerUserRepository.findById(id);
    if (!StickerUser) {
      throw new Error('StickerUser not found');
    }
    return StickerUser;
  }


  async deleteStickerUser(id: string): Promise<void> {
    const StickerUser = await this.stickerUserRepository.findById(id);
    if (!StickerUser) {
      throw new Error('StickerUser not found');
    }
    await this.stickerUserRepository.delete(id);
  }

  async getAllStickersForUser(userId: string): Promise<StickerUserSummary[]> {
    const stickerUsers = await this.stickerUserRepository.findAllByUserId(userId);

    if (!Array.isArray(stickerUsers) || stickerUsers.length === 0) {
      throw new Error('No StickerUser records found for this userId');
    }

    return stickerUsers.map(stickerUser => {
      const sticker = stickerUser.sticker || {};
      const stickerProperties = sticker.stickerProperties;

      return {
        isActive: stickerUser.isActive,
        mapCode: stickerUser.mapCode?.mapCode || null,
        maximumUsers: stickerProperties?.maximumUsers || 0,
        stickerItemType: stickerProperties?.stickerItemType?.type || 'N/A',
        stickerCallType: stickerProperties?.stickerCallType?.type || 'N/A',
        stickerType: sticker.stickerType?.type || 'N/A',
      };
    });
  }
  
}