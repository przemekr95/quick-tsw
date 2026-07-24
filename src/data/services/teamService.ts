import type { Player, SectionId } from '../../shared/types/domain';
import teamKobiety from '../mocks/team.kobiety.json';
import teamMezczyzni from '../mocks/team.mezczyzni.json';

const teamBySection: Record<SectionId, Player[]> = {
  kobiety: teamKobiety,
  mezczyzni: teamMezczyzni,
};

export async function getTeamData(section: SectionId): Promise<Player[]> {
  return Promise.resolve(teamBySection[section]);
}
