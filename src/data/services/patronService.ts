import type { Patron, SectionId } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getPatronsData(section: SectionId): Promise<Patron[]> {
  return getSectionContent<Patron[]>(section, 'patrons');
}
