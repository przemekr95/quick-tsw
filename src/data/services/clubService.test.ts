import { describe, expect, it } from 'vitest';
import { getClubData } from './clubService';

describe('clubService', () => {
  it('returns club data for kobiety', async () => {
    const data = await getClubData('kobiety');

    expect(data.name).toContain('Kobiety');
  });

  it('returns club data for mezczyzni', async () => {
    const data = await getClubData('mezczyzni');

    expect(data.name).toContain('Mężczyźni');
  });
});
