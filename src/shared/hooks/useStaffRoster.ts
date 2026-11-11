import { getStaffData } from '../../data/services/staffService';
import type { SectionId, StaffMember } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

// One shared empty list, so `data` keeps its identity while loading or after an error.
const NO_STAFF: StaffMember[] = [];

export function useStaffRoster(section: SectionId): SectionDataState<StaffMember[]> {
  return useSectionData<StaffMember[]>(section, getStaffData, NO_STAFF);
}
