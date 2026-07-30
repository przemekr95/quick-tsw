import { describe, expect, it } from 'vitest';
import { getClubLandingContent } from './clubLandingContentService';

describe('clubLandingContentService', () => {
  it('returns landing content for kobiety', async () => {
    const data = await getClubLandingContent('kobiety');

    expect(data.rosterCards.length).toBe(4);
    expect(data.recruitmentPaths.length).toBeGreaterThan(0);
  });

  it('returns landing content for mezczyzni', async () => {
    const data = await getClubLandingContent('mezczyzni');

    expect(data.matchCountdown.length).toBe(4);
    expect(data.matchForm.length).toBe(5);
  });
});
