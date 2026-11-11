import { getPatronsData } from '../../data/services/patronService';
import type { Patron, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

// One shared empty list, so `data` keeps its identity while loading or after an error.
const NO_PATRONS: Patron[] = [];

export function usePatrons(section: SectionId): SectionDataState<Patron[]> {
  return useSectionData<Patron[]>(section, getPatronsData, NO_PATRONS);
}
