import type { ClubLandingContent, SectionId } from '../../shared/types/domain';
import clubLandingKobiety from '../mocks/club-landing.kobiety.json';
import clubLandingMezczyzni from '../mocks/club-landing.mezczyzni.json';

const clubLandingContentBySection: Record<SectionId, ClubLandingContent> = {
  kobiety: clubLandingKobiety,
  mezczyzni: clubLandingMezczyzni,
};

export async function getClubLandingContent(section: SectionId): Promise<ClubLandingContent> {
  return Promise.resolve(clubLandingContentBySection[section]);
}
