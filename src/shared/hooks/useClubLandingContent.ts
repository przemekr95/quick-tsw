import { getClubLandingContent } from '../../data/services/clubLandingContentService';
import type { ClubLandingContent, SectionId } from '../types/domain';
import { type SectionDataState, useSectionData } from './useSectionData';

export function useClubLandingContent(
  section: SectionId,
): SectionDataState<ClubLandingContent | null> {
  return useSectionData<ClubLandingContent | null>(section, getClubLandingContent, null);
}
