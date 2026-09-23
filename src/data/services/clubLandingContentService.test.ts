import { describe, expect, it } from 'vitest';
import { getClubLandingContent } from './clubLandingContentService';

describe('clubLandingContentService', () => {
  it('returns landing content for mezczyzni', async () => {
    const data = await getClubLandingContent('mezczyzni');

    expect(data.nextMatch.kickoffAt).toBe('2026-11-07T18:00:00+01:00');
    expect(data.matchForm.length).toBe(5);
  });
});
