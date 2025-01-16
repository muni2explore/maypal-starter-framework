import { ContactUs } from '../../entities/ContactUs';

export interface IContactUsRepository {
  findById(id: string): Promise<ContactUs | null>;
  findByPhoneNumber(phoneNumber: string): Promise<ContactUs | null>;
  create(contactUs: Partial<ContactUs>): Promise<ContactUs>;
  update(id: string, contactUs: Partial<ContactUs>): Promise<ContactUs>;
  delete(id: string): Promise<void>;
}