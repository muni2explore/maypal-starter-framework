import { injectable, inject } from 'tsyringe';
import { IStickerTypeService, CreateStickerTypeDTO, UpdateStickerTypeDTO } from './interfaces/IStickerTypeService';
import { IStickerTypeRepository } from '../repositories/interfaces/IStickerTypeRepository';
import { StickerType } from '../entities/StickerType';
import { TYPES } from '../di/types';

@injectable()
export class StickerTypeService implements IStickerTypeService {
    constructor(
        @inject(TYPES.StickerTypeRepository)
        private stickerTypeRepository: IStickerTypeRepository
    ) {}

  async createStickerType(data: CreateStickerTypeDTO): Promise<StickerType> {
    const existingTypeStickerType = await this.stickerTypeRepository.findByType(data.type);
    if (existingTypeStickerType) {
      throw new Error('Sticker with this Type already exists');
    }
    return this.stickerTypeRepository.create(data);
  }

  async updateStickerType(id: number, data: UpdateStickerTypeDTO): Promise<StickerType> {
    const StickerType = await this.stickerTypeRepository.findById(id);
    if (!StickerType) {
      throw new Error('StickerType not found');
    }
    return this.stickerTypeRepository.update(id, data);
  }

  async getStickerTypeById(id: number): Promise<StickerType> {
    const StickerType = await this.stickerTypeRepository.findById(id);
    if (!StickerType) {
      throw new Error('StickerType not found');
    }
    return StickerType;
  }


  async getStickerTypeByType(type: string): Promise<StickerType> {
    const stickerType = await this.stickerTypeRepository.findByType(type);
    if (!stickerType) {
      throw new Error('StickerType not found');
    }
    return stickerType;
  }

  async deleteStickerType(id: number): Promise<void> {
    const stickerType = await this.stickerTypeRepository.findById(id);
    if (!stickerType) {
      throw new Error('StickerType not found');
    }
    await this.stickerTypeRepository.delete(id);
  }
}