import { describe, expect, it } from 'vitest';
import { getPatronsData } from './patronService';

describe('patronService', () => {
  it('returns patrons data for mezczyzni', async () => {
    const data = await getPatronsData('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
  });
});
