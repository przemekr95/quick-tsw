import type { SectionId, UpcomingMatch } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getUpcomingMatches(section: SectionId): Promise<UpcomingMatch[]> {
  return getSectionContent<UpcomingMatch[]>(section, 'matches');
}
