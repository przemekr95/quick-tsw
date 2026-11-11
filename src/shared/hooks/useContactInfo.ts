import { getContactData } from '../../data/services/contactService';
import type { ContactInfo, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

export function useContactInfo(section: SectionId): SectionDataState<ContactInfo | null> {
  return useSectionData<ContactInfo | null>(section, getContactData, null);
}
