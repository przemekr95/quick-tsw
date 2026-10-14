import type { SectionId, StandingsRow } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getStandings(section: SectionId): Promise<StandingsRow[]> {
  return getSectionContent<StandingsRow[]>(section, 'standings');
}
