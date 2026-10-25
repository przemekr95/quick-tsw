import type { SectionId, StaffMember } from '../../shared/types/domain';
import staffData from '../mocks/staff.mezczyzni.json';

export async function getStaffData(_section: SectionId): Promise<StaffMember[]> {
  return staffData as unknown as StaffMember[];
}
