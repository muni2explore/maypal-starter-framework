import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { StickerProperty } from '../entities/StickerProperty';
import { AppDataSource } from '../config/database';
import { IStickerPropertyRepository } from './interfaces/IStickerPropertyRepository';

@injectable()
export class StickerPropertyRepository implements IStickerPropertyRepository {
  private repository: Repository<StickerProperty>;

  constructor() {
    this.repository = AppDataSource.getRepository(StickerProperty);
  }

  async findById(id: string): Promise<StickerProperty | null> {
    return this.repository.findOneBy({ id });
  }

  async findByPin(stickerPin: string): Promise<StickerProperty | null> {
    return this.repository.findOneBy({ stickerPin });
  }

  async create(stickerProperty: Partial<StickerProperty>): Promise<StickerProperty> {
    const newStickerProperty = this.repository.create(stickerProperty);
    return this.repository.save(newStickerProperty);
  }

  async update(id: string, stickerProperty: Partial<StickerProperty>): Promise<StickerProperty> {
    await this.repository.update(id, stickerProperty);
    const updatedStickerProperty = await this.findById(id);
    if (!updatedStickerProperty) throw new Error('StickerProperty not found');
    return updatedStickerProperty;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}