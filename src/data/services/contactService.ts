import type { ContactInfo, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getContactData(section: SectionId): Promise<ContactInfo> {
  return getSectionContent<ContactInfo>(section, 'contact');
}
