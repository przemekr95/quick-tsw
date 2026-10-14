import type { Player, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getTeamData(section: SectionId): Promise<Player[]> {
  return getSectionContent<Player[]>(section, 'players');
}
