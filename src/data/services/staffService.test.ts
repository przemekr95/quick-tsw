import { describe, expect, it } from 'vitest';
import { getStaffData } from './staffService';

describe('staffService', () => {
  it('returns staff data for kobiety', async () => {
    const data = await getStaffData('kobiety');

    expect(data.length).toBeGreaterThan(0);
  });

  it('returns staff data for mezczyzni', async () => {
    const data = await getStaffData('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
  });
});
