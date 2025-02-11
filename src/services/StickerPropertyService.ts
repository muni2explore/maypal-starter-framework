import { injectable, inject } from 'tsyringe';
import { IStickerPropertyService, CreateStickerPropertyDTO, UpdateStickerPropertyDTO } from './interfaces/IStickerPropertyService';
import { IStickerPropertyRepository } from '../repositories/interfaces/IStickerPropertyRepository';
import { StickerProperty } from '../entities/StickerProperty';
import { TYPES } from '../di/types';

@injectable()
export class StickerPropertyService implements IStickerPropertyService {
    constructor(
        @inject(TYPES.StickerPropertyRepository)
        private stickerPropertyRepository: IStickerPropertyRepository
    ) {}

  async createStickerProperty(data: CreateStickerPropertyDTO): Promise<StickerProperty> {
    const existingStickerId = await this.stickerPropertyRepository.findByStickerId(data.stickerId);
    const existingStickerPin = await this.stickerPropertyRepository.findByPin(data.stickerPin);
    
    if (existingStickerId) {
      throw new Error('StickerProperty with this StickerId already exists');
    }
    if(existingStickerPin)
    {
      throw new Error('StickerProperty of StickerId with this StickerPin already exists');
    }
    return this.stickerPropertyRepository.create(data);
  }

  async updateStickerProperty(id: string, data: UpdateStickerPropertyDTO): Promise<StickerProperty> {
    const StickerProperty = await this.stickerPropertyRepository.findById(id);
    if (!StickerProperty) {
      throw new Error('StickerProperty not found');
    }
    return this.stickerPropertyRepository.update(id, data);
  }

  async getStickerPropertyById(id: string): Promise<StickerProperty> {
    const StickerProperty = await this.stickerPropertyRepository.findById(id);
    if (!StickerProperty) {
      throw new Error('StickerProperty not found');
    }
    return StickerProperty;
  }

  async getStickerPropertyByPin(stickerPin: string): Promise<StickerProperty> {
    const stickerProperty = await this.stickerPropertyRepository.findByPin(stickerPin);
    if (!stickerProperty) {
      throw new Error('StickerProperty not found');
    }
    return stickerProperty;
  }

  async deleteStickerProperty(id: string): Promise<void> {
    const stickerProperty = await this.stickerPropertyRepository.findById(id);
    if (!stickerProperty) {
      throw new Error('StickerProperty not found');
    }
    await this.stickerPropertyRepository.delete(id);
  }
}