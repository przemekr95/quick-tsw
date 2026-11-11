import { getPartnershipContent } from '../../data/services/partnershipService';
import type { PartnershipContent, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

export function usePartnershipContent(
  section: SectionId,
): SectionDataState<PartnershipContent | null> {
  return useSectionData<PartnershipContent | null>(section, getPartnershipContent, null);
}
