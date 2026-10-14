import type { Club, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getClubData(section: SectionId): Promise<Club> {
  return getSectionContent<Club>(section, 'club');
}
