import type { SectionId, StaffMember } from '../../shared/types/domain';
import staffMezczyzni from '../mocks/staff.mezczyzni.json';

const staffBySection: Record<SectionId, StaffMember[]> = {
  mezczyzni: staffMezczyzni as StaffMember[],
};

export async function getStaffData(section: SectionId): Promise<StaffMember[]> {
  return Promise.resolve(staffBySection[section]);
}
