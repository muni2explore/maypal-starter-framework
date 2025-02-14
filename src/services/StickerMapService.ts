import { injectable, inject } from 'tsyringe';
import { IStickerMapService, CreateStickerMapDTO, UpdateStickerMapDTO } from './interfaces/IStickerMapService';
import { IStickerMapRepository } from '../repositories/interfaces/IStickerMapRepository';
import { StickerMap } from '../entities/StickerMap';
import { TYPES } from '../di/types';

@injectable()
export class StickerMapService implements IStickerMapService {
    constructor(
        @inject(TYPES.StickerMapRepository)
        private stickerMapRepository: IStickerMapRepository
    ) {}

  async createStickerMap(data: CreateStickerMapDTO): Promise<StickerMap> {
    const existingStickerMapCode = await this.stickerMapRepository.findByMapCode(data.mapCode);
    if (existingStickerMapCode) {
    throw new Error('StickerMap with this StickerMapCode already exists');
    }
    return this.stickerMapRepository.create(data);
  }

  async updateStickerMap(id: string, data: UpdateStickerMapDTO): Promise<StickerMap> {
    const StickerMap = await this.stickerMapRepository.findById(id);
    if (!StickerMap) {
      throw new Error('StickerMap not found');
    }
    return this.stickerMapRepository.update(id, data);
  }

  async getStickerMapById(id: string): Promise<StickerMap> {
    const StickerMap = await this.stickerMapRepository.findById(id);
    if (!StickerMap) {
      throw new Error('StickerMap not found');
    }
    return StickerMap;
  }

  async getStickerMapByMapCode(mapCode: string): Promise<StickerMap> {
    const StickerMap = await this.stickerMapRepository.findByMapCode(mapCode);
    if (!StickerMap) {
      throw new Error('StickerMap not found');
    }
    return StickerMap;
  }

  async deleteStickerMap(id: string): Promise<void> {
    const StickerMap = await this.stickerMapRepository.findById(id);
    if (!StickerMap) {
      throw new Error('StickerMap not found');
    }
    await this.stickerMapRepository.delete(id);
  }
}