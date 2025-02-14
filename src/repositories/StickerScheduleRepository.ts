import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { StickerSchedule } from '../entities/StickerSchedule';
import { AppDataSource } from '../config/database';
import { IStickerScheduleRepository } from './interfaces/IStickerScheduleRepository';

@injectable()
export class StickerScheduleRepository implements IStickerScheduleRepository {
  private repository: Repository<StickerSchedule>;

  constructor() {
    this.repository = AppDataSource.getRepository(StickerSchedule);
  }

  async findById(id: string): Promise<StickerSchedule | null> {
    return this.repository.findOneBy({ id });
  }

  async findByStickerId(stickerId: string): Promise<StickerSchedule | null> {
    return this.repository.findOneBy({ stickerId });
  }

  async create(stickerSchedule: Partial<StickerSchedule>): Promise<StickerSchedule> {
    const newStickerSchedule = this.repository.create(stickerSchedule);
    return this.repository.save(newStickerSchedule);
  }

  async update(id: string, stickerSchedule: Partial<StickerSchedule>): Promise<StickerSchedule> {
    await this.repository.update(id, stickerSchedule);
    const updatedStickerSchedule = await this.findById(id);
    if (!updatedStickerSchedule) throw new Error('StickerSchedule not found');
    return updatedStickerSchedule;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}