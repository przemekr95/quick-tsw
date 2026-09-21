import { useOutletContext } from 'react-router-dom';
import type { Club, ClubLandingContent } from '../types/domain';

export interface SectionOutletContext {
  club: Club | null;
  landingContent: ClubLandingContent | null;
}

export function useSectionOutletContext(): SectionOutletContext {
  return useOutletContext<SectionOutletContext>();
}
