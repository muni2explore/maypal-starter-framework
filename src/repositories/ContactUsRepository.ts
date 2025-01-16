import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { ContactUs } from '../entities/ContactUs';
import { AppDataSource } from '../config/database';
import { IContactUsRepository } from './interfaces/IContactUsRepository';

@injectable()
export class ContactUsRepository implements IContactUsRepository {
  private repository: Repository<ContactUs>;

  constructor() {
    this.repository = AppDataSource.getRepository(ContactUs);
  }

  async findById(id: string): Promise<ContactUs | null> {
    return this.repository.findOneBy({ id });
  }


  async findByPhoneNumber(phoneNumber: string): Promise<ContactUs | null> {
    return this.repository.findOneBy({ phoneNumber });
  }

  async create(contactUs: Partial<ContactUs>): Promise<ContactUs> {
    const newContactUs = this.repository.create(contactUs);
    return this.repository.save(newContactUs);
  }

  async update(id: string, contactUs: Partial<ContactUs>): Promise<ContactUs> {
    await this.repository.update(id, contactUs);
    const updatedContactUs = await this.findById(id);
    if (!updatedContactUs) throw new Error('ContactUs not found');
    return updatedContactUs;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}