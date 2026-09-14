import { describe, expect, it } from 'vitest';
import { getClubData } from './clubService';

describe('clubService', () => {
  it('returns club data for mezczyzni', async () => {
    const data = await getClubData('mezczyzni');

    expect(data.name).toContain('Mężczyźni');
  });
});
