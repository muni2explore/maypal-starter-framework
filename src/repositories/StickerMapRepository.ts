import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { StickerMap } from '../entities/StickerMap';
import { AppDataSource } from '../config/database';
import { IStickerMapRepository } from './interfaces/IStickerMapRepository';

@injectable()
export class StickerMapRepository implements IStickerMapRepository {
  private repository: Repository<StickerMap>;

  constructor() {
    this.repository = AppDataSource.getRepository(StickerMap);
  }

  async findById(id: string): Promise<StickerMap | null> {
    return this.repository.findOneBy({ id });
  }

  async findByMapCode(mapCode: string): Promise<StickerMap | null> {
    return this.repository.findOneBy({ mapCode });
  }

  async create(stickerMap: Partial<StickerMap>): Promise<StickerMap> {
    const newStickerMap = this.repository.create(stickerMap);
    return this.repository.save(newStickerMap);
  }

  async update(id: string, stickerMap: Partial<StickerMap>): Promise<StickerMap> {
    await this.repository.update(id, stickerMap);
    const updatedStickerMap = await this.findById(id);
    if (!updatedStickerMap) throw new Error('StickerMap not found');
    return updatedStickerMap;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}