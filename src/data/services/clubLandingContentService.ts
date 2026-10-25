import type { ClubLandingContent, SectionId } from '../../shared/types/domain';
import clubLandingContent from '../mocks/club-landing.mezczyzni.json';

export async function getClubLandingContent(_section: SectionId): Promise<ClubLandingContent> {
  return clubLandingContent as unknown as ClubLandingContent;
}
