import { describe, expect, it } from 'vitest';
import { getRoutePageMeta, PAGE_META } from './pageMeta';

describe('getRoutePageMeta', () => {
  it('returns the meta of the deepest matched route that has one', () => {
    const meta = getRoutePageMeta([
      { handle: undefined },
      { handle: { pageMeta: PAGE_META.klub } },
      { handle: { pageMeta: PAGE_META.druzyna } },
    ]);

    expect(meta).toBe(PAGE_META.druzyna);
  });

  it('falls back to the indexable site meta when no route has a handle', () => {
    const meta = getRoutePageMeta([{ handle: undefined }, { handle: { other: true } }]);

    expect(meta).toBe(PAGE_META.klub);
    expect(meta.noindex).toBeUndefined();
  });

  it('marks only the not-found page as noindex', () => {
    const noindexPages = Object.entries(PAGE_META)
      .filter(([, meta]) => 'noindex' in meta && meta.noindex)
      .map(([key]) => key);

    expect(noindexPages).toEqual(['notFound']);
  });

  it('keeps every description within the length search engines display', () => {
    for (const { description } of Object.values(PAGE_META)) {
      expect(description.length).toBeLessThanOrEqual(160);
    }
  });
});
