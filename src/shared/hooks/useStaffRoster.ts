import { useEffect, useState } from 'react';
import { getStaffData } from '../../data/services/staffService';
import type { SectionId, StaffMember } from '../types/domain';

interface UseStaffRosterState {
  data: StaffMember[];
  loading: boolean;
}

export function useStaffRoster(section: SectionId): UseStaffRosterState {
  const [state, setState] = useState<UseStaffRosterState>({ data: [], loading: true });

  useEffect(() => {
    void getStaffData(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
