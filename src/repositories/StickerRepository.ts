import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { Sticker } from '../entities/Sticker';
import { AppDataSource } from '../config/database';
import { IStickerRepository } from './interfaces/IStickerRepository';

@injectable()
export class StickerRepository implements IStickerRepository {
  private repository: Repository<Sticker>;

  constructor() {
    this.repository = AppDataSource.getRepository(Sticker);
  }

  async findById(id: string): Promise<Sticker | null> {
    return this.repository.findOneBy({ id });
  }

  async findByStickerCode(stickerCode: string): Promise<Sticker | null> {
    return this.repository.findOneBy({ stickerCode });
  }

  async create(Sticker: Partial<Sticker>): Promise<Sticker> {
    const newSticker = this.repository.create(Sticker);
    return this.repository.save(newSticker);
  }

  async update(id: string, sticker: Partial<Sticker>): Promise<Sticker> {
    await this.repository.update(id, sticker);
    const updatedSticker = await this.findById(id);
    if (!updatedSticker) throw new Error('Sticker not found');
    return updatedSticker;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}