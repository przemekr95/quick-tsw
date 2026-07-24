import { useEffect, useState } from 'react';
import { getClubData } from '../../data/services/clubService';
import type { Club, SectionId } from '../types/domain';

interface UseClubDataState {
  data: Club | null;
  loading: boolean;
}

export function useClubData(section: SectionId): UseClubDataState {
  const [state, setState] = useState<UseClubDataState>({ data: null, loading: true });

  useEffect(() => {
    void getClubData(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
