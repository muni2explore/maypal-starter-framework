import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { StickerUser } from '../entities/StickerUser';
import { AppDataSource } from '../config/database';
import { IStickerUserRepository } from './interfaces/IStickerUserRepository';

@injectable()
export class StickerUserRepository implements IStickerUserRepository {
  private repository: Repository<StickerUser>;

  constructor() {
    this.repository = AppDataSource.getRepository(StickerUser);
  }

  async findById(id: string): Promise<StickerUser | null> {
    return this.repository.findOneBy({ id });
  }

  async findByStickerId(stickerId: string): Promise<StickerUser | null> {
    return this.repository.findOneBy({ stickerId });
  }

  async findByUserId(userId: string): Promise<StickerUser | null> {
    return this.repository.findOneBy({ userId });
  }

  async create(stickerUser: Partial<StickerUser>): Promise<StickerUser> {
    const newStickerUser = this.repository.create(stickerUser);
    return this.repository.save(newStickerUser);
  }

  async update(id: string, stickerUser: Partial<StickerUser>): Promise<StickerUser> {
    await this.repository.update(id, stickerUser);
    const updatedStickerUser = await this.findById(id);
    if (!updatedStickerUser) throw new Error('StickerUser not found');
    return updatedStickerUser;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

      async findAllByUserId(userId: string): Promise<StickerUser[]> {
        return this.repository.find({
            where: { userId },
            relations: [
                'sticker',
                'sticker.stickerType',
                'sticker.stickerProperties',
                'sticker.stickerProperties.stickerItemType',
                'sticker.stickerProperties.stickerCallType',
                'mapCode', 
            ],
        });
    }

}