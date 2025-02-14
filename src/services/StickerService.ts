import { injectable, inject } from 'tsyringe';
import { IStickerService, CreateStickerDTO, UpdateStickerDTO } from './interfaces/IStickerService';
import { IStickerRepository } from '../repositories/interfaces/IStickerRepository';
import { Sticker } from '../entities/Sticker';
import { TYPES } from '../di/types';

@injectable()
export class StickerService implements IStickerService {
    constructor(
        @inject(TYPES.StickerRepository)
        private stickerRepository: IStickerRepository
    ) {}

  async createSticker(data: CreateStickerDTO): Promise<Sticker> {
    const existingStickerCode = await this.stickerRepository.findByStickerCode(data.stickerCode);
    if (existingStickerCode) {
    throw new Error('Sticker with this StickerCode already exists');
    }
    return this.stickerRepository.create(data);
  }

  async updateSticker(id: string, data: UpdateStickerDTO): Promise<Sticker> {
    const sticker = await this.stickerRepository.findById(id);
    if (!sticker) {
      throw new Error('Sticker not found');
    }
    return this.stickerRepository.update(id, data);
  }

  async getStickerById(id: string): Promise<Sticker> {
    const sticker = await this.stickerRepository.findById(id);
    if (!sticker) {
      throw new Error('Sticker not found');
    }
    return sticker;
  }

  async getStickerByCode(stickerCode: string): Promise<Sticker> {
    const sticker = await this.stickerRepository.findByStickerCode(stickerCode);
    if (!sticker) {
      throw new Error('Sticker not found');
    }
    return sticker;
  }

  async deleteSticker(id: string): Promise<void> {
    const Sticker = await this.stickerRepository.findById(id);
    if (!Sticker) {
      throw new Error('Sticker not found');
    }
    await this.stickerRepository.delete(id);
  }
}