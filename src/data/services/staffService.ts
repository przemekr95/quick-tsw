import type { SectionId, StaffMember } from '../../shared/types/domain';
import { getSectionContent } from './apiClient';

export async function getStaffData(section: SectionId): Promise<StaffMember[]> {
  return getSectionContent<StaffMember[]>(section, 'staff');
}
