
import { ContactUs } from '../../entities/ContactUs';

export interface CreateContactUsDTO {
    phoneNumber: string;
    emailAddress: string;
    subject: string;
    message: string;
    userid?: string; 
}

export interface UpdateContactUsDTO {
    phoneNumber?: string;
    emailAddress?: string;
    subject?: string;
    message?: string;
    userid?: string; 
}

export interface IContactUsService {
  createContactUs(data: CreateContactUsDTO): Promise<ContactUs>;
  updateContactUs(id: string, data: UpdateContactUsDTO): Promise<ContactUs>;
  getContactUsById(id: string): Promise<ContactUs>;
  getContactUsByPhoneNumber(phoneNumber: string): Promise<ContactUs>;
  deleteContactUs(id: string): Promise<void>;
}