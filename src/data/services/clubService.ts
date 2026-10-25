import type { Club, SectionId } from '../../shared/types/domain';
import clubData from '../mocks/club.mezczyzni.json';

export async function getClubData(_section: SectionId): Promise<Club> {
  return clubData as unknown as Club;
}
