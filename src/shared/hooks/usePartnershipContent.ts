import { useEffect, useState } from 'react';
import { getPartnershipContent } from '../../data/services/partnershipService';
import type { PartnershipContent, SectionId } from '../types/domain';

interface UsePartnershipContentState {
  data: PartnershipContent | null;
  loading: boolean;
}

export function usePartnershipContent(section: SectionId): UsePartnershipContentState {
  const [state, setState] = useState<UsePartnershipContentState>({ data: null, loading: true });

  useEffect(() => {
    void getPartnershipContent(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
