import type { ClubLandingContent, SectionId } from '../../shared/types/domain';
import clubLandingMezczyzni from '../mocks/club-landing.mezczyzni.json';

const clubLandingContentBySection: Record<SectionId, ClubLandingContent> = {
  mezczyzni: clubLandingMezczyzni,
};

export async function getClubLandingContent(section: SectionId): Promise<ClubLandingContent> {
  return Promise.resolve(clubLandingContentBySection[section]);
}
