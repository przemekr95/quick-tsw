import type { PartnershipContent, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getPartnershipContent(section: SectionId): Promise<PartnershipContent> {
  return getSectionContent<PartnershipContent>(section, 'partnership');
}
