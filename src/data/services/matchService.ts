import type { SectionId, UpcomingMatch } from '../../shared/types/domain';
import matchesMezczyzni from '../mocks/matches.mezczyzni.json';

const matchesBySection: Record<SectionId, UpcomingMatch[]> = {
  mezczyzni: matchesMezczyzni as UpcomingMatch[],
};

export async function getUpcomingMatches(section: SectionId): Promise<UpcomingMatch[]> {
  return Promise.resolve(matchesBySection[section]);
}
