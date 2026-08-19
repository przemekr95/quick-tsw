import type { ContactInfo, SectionId } from '../../shared/types/domain';
import contactKobiety from '../mocks/contact.kobiety.json';
import contactMezczyzni from '../mocks/contact.mezczyzni.json';

const contactBySection: Record<SectionId, ContactInfo> = {
  kobiety: contactKobiety as ContactInfo,
  mezczyzni: contactMezczyzni as ContactInfo,
};

export async function getContactData(section: SectionId): Promise<ContactInfo> {
  return Promise.resolve(contactBySection[section]);
}
