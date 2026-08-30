import type { PartnershipContent, SectionId } from '../../shared/types/domain';
import partnershipKobiety from '../mocks/partnership.kobiety.json';
import partnershipMezczyzni from '../mocks/partnership.mezczyzni.json';

const partnershipContentBySection: Record<SectionId, PartnershipContent> = {
  kobiety: partnershipKobiety as PartnershipContent,
  mezczyzni: partnershipMezczyzni as PartnershipContent,
};

export async function getPartnershipContent(section: SectionId): Promise<PartnershipContent> {
  return Promise.resolve(partnershipContentBySection[section]);
}
