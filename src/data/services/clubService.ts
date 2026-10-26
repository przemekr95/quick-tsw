import type { Club, SectionId } from '../../shared/types/domain';
import clubMezczyzni from '../mocks/club.mezczyzni.json';

const clubBySection: Record<SectionId, Club> = {
  mezczyzni: clubMezczyzni as Club,
};

export async function getClubData(section: SectionId): Promise<Club> {
  return Promise.resolve(clubBySection[section]);
}
