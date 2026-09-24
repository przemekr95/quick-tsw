import type { SectionId, StandingsRow } from '../../shared/types/domain';
import standingsMezczyzni from '../mocks/standings.mezczyzni.json';

const standingsBySection: Record<SectionId, StandingsRow[]> = {
  mezczyzni: standingsMezczyzni as StandingsRow[],
};

export async function getStandings(section: SectionId): Promise<StandingsRow[]> {
  return Promise.resolve(standingsBySection[section]);
}
