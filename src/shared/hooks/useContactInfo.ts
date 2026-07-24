import { useEffect, useState } from 'react';
import { getContactData } from '../../data/services/contactService';
import type { ContactInfo, SectionId } from '../types/domain';

interface UseContactInfoState {
  data: ContactInfo | null;
  loading: boolean;
}

export function useContactInfo(section: SectionId): UseContactInfoState {
  const [state, setState] = useState<UseContactInfoState>({ data: null, loading: true });

  useEffect(() => {
    void getContactData(section).then((data) => {
      setState({ data, loading: false });
    });
  }, [section]);

  return state;
}
