import { describe, expect, it } from 'vitest';
import { getClubLandingContent } from './clubLandingContentService';

describe('clubLandingContentService', () => {
  it('returns landing content for mezczyzni', async () => {
    const data = await getClubLandingContent('mezczyzni');

    expect(data.heroHeading).toBeTruthy();
    expect(data.matchForm.length).toBe(5);
  });
});
