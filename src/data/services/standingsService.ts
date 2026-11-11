import type { SectionId, StandingsRow } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

// The API does not guarantee row order, so the table always lists teams by
// league position.
export async function getStandings(section: SectionId): Promise<StandingsRow[]> {
  const rows = await getSectionContent<StandingsRow[]>(section, 'standings');

  return [...rows].sort((a, b) => a.position - b.position);
}
