import { useEffect, useState } from 'react';
import { getClubLandingContent } from '../../data/services/clubLandingContentService';
import type { ClubLandingContent, SectionId } from '../types/domain';

interface UseClubLandingContentState {
  data: ClubLandingContent | null;
  loading: boolean;
}

export function useClubLandingContent(section: SectionId): UseClubLandingContentState {
  const [state, setState] = useState<UseClubLandingContentState>({ data: null, loading: true });

  useEffect(() => {
    void getClubLandingContent(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
