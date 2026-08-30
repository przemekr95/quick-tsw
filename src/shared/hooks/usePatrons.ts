import { useEffect, useState } from 'react';
import { getPatronsData } from '../../data/services/patronService';
import type { Patron, SectionId } from '../types/domain';

interface UsePatronsState {
  data: Patron[];
  loading: boolean;
}

export function usePatrons(section: SectionId): UsePatronsState {
  const [state, setState] = useState<UsePatronsState>({ data: [], loading: true });

  useEffect(() => {
    void getPatronsData(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
