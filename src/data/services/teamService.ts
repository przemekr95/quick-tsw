import type { Player, SectionId } from '../../shared/types/domain';
import teamMezczyzni from '../mocks/team.mezczyzni.json';

const teamBySection: Record<SectionId, Player[]> = {
  mezczyzni: teamMezczyzni,
};

export async function getTeamData(section: SectionId): Promise<Player[]> {
  return Promise.resolve(teamBySection[section]);
}
