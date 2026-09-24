import { useEffect, useState } from 'react';
import { getStandings } from '../../data/services/standingsService';
import type { SectionId, StandingsRow } from '../types/domain';

interface UseStandingsState {
  data: StandingsRow[];
  loading: boolean;
}

export function useStandings(section: SectionId): UseStandingsState {
  const [state, setState] = useState<UseStandingsState>({ data: [], loading: true });

  useEffect(() => {
    void getStandings(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
