import type { PartnershipContent, SectionId } from '../../shared/types/domain';
import partnershipContent from '../mocks/partnership.mezczyzni.json';

export async function getPartnershipContent(_section: SectionId): Promise<PartnershipContent> {
  return partnershipContent as unknown as PartnershipContent;
}
