import { useEffect, useState } from 'react';
import { getUpcomingMatches } from '../../data/services/matchService';
import type { SectionId, UpcomingMatch } from '../types/domain';

interface UseUpcomingMatchesState {
  data: UpcomingMatch[];
  loading: boolean;
}

export function useUpcomingMatches(section: SectionId): UseUpcomingMatchesState {
  const [state, setState] = useState<UseUpcomingMatchesState>({ data: [], loading: true });

  useEffect(() => {
    void getUpcomingMatches(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
