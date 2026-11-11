import { getTeamData } from '../../data/services/teamService';
import type { Player, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

// One shared empty list, so `data` keeps its identity while loading or after an error.
const NO_PLAYERS: Player[] = [];

export function useTeamRoster(section: SectionId): SectionDataState<Player[]> {
  return useSectionData<Player[]>(section, getTeamData, NO_PLAYERS);
}
