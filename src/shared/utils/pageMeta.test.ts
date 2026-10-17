import { describe, expect, it } from 'vitest';
import { getPageMeta, NOT_FOUND_PAGE_META } from './pageMeta';

describe('getPageMeta', () => {
  it('returns the meta of a known tab', () => {
    const meta = getPageMeta('/druzyna', '');

    expect(meta.title).toBe('Drużyna | Siatkówka mężczyzn TS Wisła Kraków');
    expect(meta.heading).toBe('Drużyna siatkówki mężczyzn TS Wisła Kraków');
    expect(meta.noindex).toBeUndefined();
  });

  it('ignores a trailing slash and the section prefix', () => {
    expect(getPageMeta('/kontakt/', '').title).toBe('Kontakt | Siatkówka mężczyzn TS Wisła Kraków');
    expect(getPageMeta('/mezczyzni/media', '/mezczyzni').title).toBe(
      'Media | Siatkówka mężczyzn TS Wisła Kraków',
    );
  });

  it('falls back to the noindex not-found meta for unknown paths', () => {
    expect(getPageMeta('/nie-ma-takiej-strony', '')).toBe(NOT_FOUND_PAGE_META);
    expect(getPageMeta('/druzyna/123', '')).toBe(NOT_FOUND_PAGE_META);
    expect(NOT_FOUND_PAGE_META.noindex).toBe(true);
  });

  it('keeps every description within the length search engines display', () => {
    const slugs = ['klub', 'druzyna', 'kontakt', 'przyjaciele', 'zostan-partnerem', 'media'];

    for (const slug of slugs) {
      const { description } = getPageMeta(`/${slug}`, '');

      expect(description).not.toBe(NOT_FOUND_PAGE_META.description);
      expect(description.length).toBeLessThanOrEqual(160);
    }
  });
});
