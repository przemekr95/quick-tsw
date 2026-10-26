import type { PartnershipContent, SectionId } from '../../shared/types/domain';
import partnershipMezczyzni from '../mocks/partnership.mezczyzni.json';

const partnershipContentBySection: Record<SectionId, PartnershipContent> = {
  mezczyzni: partnershipMezczyzni as PartnershipContent,
};

export async function getPartnershipContent(section: SectionId): Promise<PartnershipContent> {
  return Promise.resolve(partnershipContentBySection[section]);
}
