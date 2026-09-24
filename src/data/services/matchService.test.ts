import { describe, expect, it } from 'vitest';
import { getUpcomingMatches } from './matchService';

describe('matchService', () => {
  it('returns the season fixture list for mezczyzni', async () => {
    const data = await getUpcomingMatches('mezczyzni');

    expect(data.length).toBeGreaterThan(0);

    const firstLeagueRound = data.find((match) => match.round === 1);
    expect(firstLeagueRound).toMatchObject({
      opponent: 'FOTONLAB GRYF Miechów',
      kickoffTime: '18:00',
      venue: 'Miechów, ul. Konopnickiej 2',
    });

    const friendly = data.find((match) => match.competition === 'Sparing');
    expect(friendly).toMatchObject({
      opponent: 'FOTONLAB GRYF Miechów',
      matchDate: '2026-09-10',
    });
    expect(friendly?.round).toBeUndefined();
    expect(friendly?.result?.sets).toHaveLength(5);
  });
});
