import type { Club, SectionId } from '../../shared/types/domain';
import clubKobiety from '../mocks/club.kobiety.json';
import clubMezczyzni from '../mocks/club.mezczyzni.json';

const clubBySection: Record<SectionId, Club> = {
  kobiety: clubKobiety,
  mezczyzni: clubMezczyzni,
};

export async function getClubData(section: SectionId): Promise<Club> {
  return Promise.resolve(clubBySection[section]);
}
