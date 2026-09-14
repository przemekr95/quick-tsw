import { describe, expect, it } from 'vitest';
import { getTeamData } from './teamService';

describe('teamService', () => {
  it('returns roster data for mezczyzni', async () => {
    const data = await getTeamData('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
  });
});
