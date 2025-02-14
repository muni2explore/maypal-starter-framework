import { injectable, inject } from 'tsyringe';
import { IStickerScheduleService, CreateStickerScheduleDTO, UpdateStickerScheduleDTO } from './interfaces/IStickerScheduleService';
import { IStickerScheduleRepository } from '../repositories/interfaces/IStickerScheduleRepository';
import { StickerSchedule } from '../entities/StickerSchedule';
import { TYPES } from '../di/types';

@injectable()
export class StickerScheduleService implements IStickerScheduleService {
    constructor(
        @inject(TYPES.StickerScheduleRepository)
        private stickerScheduleRepository: IStickerScheduleRepository
    ) {}

  async createStickerSchedule(data: CreateStickerScheduleDTO): Promise<StickerSchedule> {
    const existingStickerScheduleCode = await this.stickerScheduleRepository.findByStickerId(data.stickerId);
    if (existingStickerScheduleCode) {
    throw new Error('StickerSchedule with this StickerScheduleCode already exists');
    }
    return this.stickerScheduleRepository.create(data);
  }

  async updateStickerSchedule(id: string, data: UpdateStickerScheduleDTO): Promise<StickerSchedule> {
    const StickerSchedule = await this.stickerScheduleRepository.findById(id);
    if (!StickerSchedule) {
      throw new Error('StickerSchedule not found');
    }
    return this.stickerScheduleRepository.update(id, data);
  }

  async getStickerScheduleById(id: string): Promise<StickerSchedule> {
    const StickerSchedule = await this.stickerScheduleRepository.findById(id);
    if (!StickerSchedule) {
      throw new Error('StickerSchedule not found');
    }
    return StickerSchedule;
  }

  async getStickerScheduleByStickerId(stickerId: string): Promise<StickerSchedule> {
    const stickerSchedule = await this.stickerScheduleRepository.findByStickerId(stickerId);
    if (!stickerSchedule) {
      throw new Error('StickerSchedule not found');
    }
    return stickerSchedule;
  }

  async deleteStickerSchedule(id: string): Promise<void> {
    const stickerSchedule = await this.stickerScheduleRepository.findById(id);
    if (!stickerSchedule) {
      throw new Error('StickerSchedule not found');
    }
    await this.stickerScheduleRepository.delete(id);
  }
}