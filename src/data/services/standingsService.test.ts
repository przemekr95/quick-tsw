import { describe, expect, it } from 'vitest';
import { getStandings } from './standingsService';

describe('standingsService', () => {
  it('returns the league standings for mezczyzni', async () => {
    const data = await getStandings('mezczyzni');

    expect(data).toHaveLength(8);

    const wisla = data.find((row) => row.team === 'TS WISŁA Kraków');
    expect(wisla?.isOwnTeam).toBe(true);
  });
});
