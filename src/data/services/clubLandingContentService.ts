import type { ClubLandingContent, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getClubLandingContent(section: SectionId): Promise<ClubLandingContent> {
  return getSectionContent<ClubLandingContent>(section, 'club-landing');
}
