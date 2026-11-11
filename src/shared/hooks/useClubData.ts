import { getClubData } from '../../data/services/clubService';
import type { Club, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

export function useClubData(section: SectionId): SectionDataState<Club | null> {
  return useSectionData<Club | null>(section, getClubData, null);
}
