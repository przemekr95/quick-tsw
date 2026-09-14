import { describe, expect, it } from 'vitest';
import { getStaffData } from './staffService';

describe('staffService', () => {
  it('returns staff data for mezczyzni', async () => {
    const data = await getStaffData('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
  });
});
