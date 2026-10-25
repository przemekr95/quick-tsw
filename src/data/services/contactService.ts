import type { ContactInfo, SectionId } from '../../shared/types/domain';
import contactData from '../mocks/contact.mezczyzni.json';

export async function getContactData(_section: SectionId): Promise<ContactInfo> {
  return contactData as unknown as ContactInfo;
}
