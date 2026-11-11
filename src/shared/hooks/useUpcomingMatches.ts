import { getUpcomingMatches } from '../../data/services/matchService';
import type { SectionId, UpcomingMatch } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

// One shared empty list, so `data` keeps its identity while loading or after an error.
const NO_MATCHES: UpcomingMatch[] = [];

export function useUpcomingMatches(section: SectionId): SectionDataState<UpcomingMatch[]> {
  return useSectionData<UpcomingMatch[]>(section, getUpcomingMatches, NO_MATCHES);
}
