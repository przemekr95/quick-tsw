import { describe, expect, it } from 'vitest';
import { getUpcomingMatches } from './matchService';

describe('matchService', () => {
  it('returns the season fixture list for mezczyzni', async () => {
    const data = await getUpcomingMatches('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toMatchObject({ opponent: 'FOTONLAB GRYF Miechów', kickoffTime: '18:00' });
  });
});
