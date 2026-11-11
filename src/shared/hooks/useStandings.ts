import { getStandings } from '../../data/services/standingsService';
import type { SectionId, StandingsRow } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

// One shared empty list, so `data` keeps its identity while loading or after an error.
const NO_STANDINGS: StandingsRow[] = [];

export function useStandings(section: SectionId): SectionDataState<StandingsRow[]> {
  return useSectionData<StandingsRow[]>(section, getStandings, NO_STANDINGS);
}
