import { useEffect, useState } from 'react';
import { getTeamData } from '../../data/services/teamService';
import type { Player, SectionId } from '../types/domain';

interface UseTeamRosterState {
  data: Player[];
  loading: boolean;
}

export function useTeamRoster(section: SectionId): UseTeamRosterState {
  const [state, setState] = useState<UseTeamRosterState>({ data: [], loading: true });

  useEffect(() => {
    void getTeamData(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
