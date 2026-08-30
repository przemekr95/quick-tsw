import { describe, expect, it } from 'vitest';
import { getPartnershipContent } from './partnershipService';

describe('partnershipService', () => {
  it('returns partnership content for kobiety', async () => {
    const data = await getPartnershipContent('kobiety');

    expect(data.tiers.length).toBeGreaterThan(0);
  });

  it('returns partnership content for mezczyzni', async () => {
    const data = await getPartnershipContent('mezczyzni');

    expect(data.tiers.length).toBeGreaterThan(0);
  });
});
