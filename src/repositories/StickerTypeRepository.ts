import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { StickerType } from '../entities/StickerType';
import { AppDataSource } from '../config/database';
import { IStickerTypeRepository } from './interfaces/IStickerTypeRepository';

@injectable()
export class StickerTypeRepository implements IStickerTypeRepository {
  private repository: Repository<StickerType>;

  constructor() {
    this.repository = AppDataSource.getRepository(StickerType);
  }

  async findById(id: number): Promise<StickerType | null> {
    return this.repository.findOneBy({ id });
  }


  async findByType(type: string): Promise<StickerType | null> {
    return this.repository.findOneBy({ type });
  }

  async create(stickerType: Partial<StickerType>): Promise<StickerType> {
    const newStickerType = this.repository.create(stickerType);
    return this.repository.save(newStickerType);
  }

  async update(id: number, StickerType: Partial<StickerType>): Promise<StickerType> {
    await this.repository.update(id, StickerType);
    const updatedStickerType = await this.findById(id);
    if (!updatedStickerType) throw new Error('Sticker Type not found');
    return updatedStickerType;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}