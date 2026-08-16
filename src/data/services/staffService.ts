import type { SectionId, StaffMember } from '../../shared/types/domain';
import staffKobiety from '../mocks/staff.kobiety.json';
import staffMezczyzni from '../mocks/staff.mezczyzni.json';

const staffBySection: Record<SectionId, StaffMember[]> = {
  kobiety: staffKobiety as StaffMember[],
  mezczyzni: staffMezczyzni as StaffMember[],
};

export async function getStaffData(section: SectionId): Promise<StaffMember[]> {
  return Promise.resolve(staffBySection[section]);
}
