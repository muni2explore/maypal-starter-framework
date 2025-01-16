import { injectable, inject } from 'tsyringe';
import { IContactUsService, CreateContactUsDTO, UpdateContactUsDTO } from './interfaces/IContactUsService';
import { IContactUsRepository } from '../repositories/interfaces/IContactUsRepository';
import { ContactUs } from '../entities/ContactUs';
import { TYPES } from '../di/types';

@injectable()
export class ContactUsService implements IContactUsService {
    constructor(
        @inject(TYPES.ContactUsRepository)
        private contactUsRepository: IContactUsRepository
    ) {}

  async createContactUs(data: CreateContactUsDTO): Promise<ContactUs> {
    const existingPhoneNumber = await this.contactUsRepository.findByPhoneNumber(data.phoneNumber);
    if (existingPhoneNumber) {
    throw new Error('ContactUs with this Mobile Number already exists');
    }
    return this.contactUsRepository.create(data);
  }

  async updateContactUs(id: string, data: UpdateContactUsDTO): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.findById(id);
    if (!contactUs) {
      throw new Error('ContactUs not found');
    }
    return this.contactUsRepository.update(id, data);
  }

  async getContactUsById(id: string): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.findById(id);
    if (!contactUs) {
      throw new Error('ContactUs not found');
    }
    return contactUs;
  }


  async getContactUsByPhoneNumber(phoneNumber: string): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.findByPhoneNumber(phoneNumber);
    if (!contactUs) {
    throw new Error('ContactUs not found');
    }
    return contactUs;
  }

  async deleteContactUs(id: string): Promise<void> {
    const contactUs = await this.contactUsRepository.findById(id);
    if (!contactUs) {
      throw new Error('ContactUs not found');
    }
    await this.contactUsRepository.delete(id);
  }
}