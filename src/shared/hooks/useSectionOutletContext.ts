import { useOutletContext } from 'react-router-dom';
import type { Club } from '../types/domain';

export interface SectionOutletContext {
  club: Club | null;
}

export function useSectionOutletContext(): SectionOutletContext {
  return useOutletContext<SectionOutletContext>();
}
