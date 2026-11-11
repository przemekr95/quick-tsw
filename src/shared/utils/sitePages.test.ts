import { describe, expect, it } from 'vitest';
import { appRoutes } from '../../app/router';
import { MEN_SECTION_PATH } from './config';
import { PAGE_META } from './pageMeta';
import {
  breadcrumbTrail,
  canonicalPath,
  findSitePage,
  pathFromHtmlFile,
  SITE_PAGES,
} from './sitePages';

describe('canonicalPath', () => {
  it.each([
    ['/', '/'],
    ['/mezczyzni/klub', '/mezczyzni/klub'],
    ['/mezczyzni/klub/', '/mezczyzni/klub'],
    ['/MEZCZYZNI/Druzyna//', '/mezczyzni/druzyna'],
  ])('turns %s into %s', (pathname, expected) => {
    expect(canonicalPath(pathname)).toBe(expected);
  });
});

describe('pathFromHtmlFile', () => {
  it.each([
    ['/mezczyzni/druzyna.html', '/mezczyzni/druzyna'],
    ['/MEZCZYZNI/Druzyna.HTML', '/mezczyzni/druzyna'],
    ['/mezczyzni/index.html', '/mezczyzni'],
    ['/index.html', '/'],
  ])('maps the file address %s to %s', (pathname, expected) => {
    expect(pathFromHtmlFile(pathname)).toBe(expected);
  });

  it('ignores addresses that are not .html files', () => {
    expect(pathFromHtmlFile('/mezczyzni/druzyna')).toBeNull();
  });
});

describe('findSitePage', () => {
  it('finds a page whatever the letter case or trailing slash', () => {
    expect(findSitePage('/MEZCZYZNI/Druzyna/')?.meta).toBe(PAGE_META.druzyna);
  });

  it('returns nothing for an address that is not an indexable page', () => {
    expect(findSitePage('/mezczyzni/nie-ma-takiej-strony')).toBeUndefined();
  });
});

describe('breadcrumbTrail', () => {
  it('starts every trail at the home page and goes through the section', () => {
    const druzyna = findSitePage(`${MEN_SECTION_PATH}/druzyna`);

    expect(druzyna && breadcrumbTrail(druzyna).map((page) => page.path)).toEqual([
      '/',
      `${MEN_SECTION_PATH}/klub`,
      `${MEN_SECTION_PATH}/druzyna`,
    ]);
  });

  it('does not repeat the section home or the home page in their own trails', () => {
    const klub = findSitePage(`${MEN_SECTION_PATH}/klub`);
    const home = findSitePage('/');

    expect(klub && breadcrumbTrail(klub).map((page) => page.path)).toEqual([
      '/',
      `${MEN_SECTION_PATH}/klub`,
    ]);
    expect(home && breadcrumbTrail(home).map((page) => page.path)).toEqual(['/']);
  });
});

describe('SITE_PAGES', () => {
  it('lists exactly the home page and every indexable tab the router serves', () => {
    const sectionRoute = appRoutes.find((route) => route.path === MEN_SECTION_PATH);
    const tabRoutes = sectionRoute?.children?.find((route) => route.children)?.children ?? [];
    const routerPages = tabRoutes
      .filter((route) => route.path !== '*')
      .map((route) => ({
        path: `${MEN_SECTION_PATH}/${route.path ?? ''}`,
        meta: (route.handle as { pageMeta: unknown }).pageMeta,
      }));

    expect(SITE_PAGES.map(({ path, meta }) => ({ path, meta }))).toEqual(
      expect.arrayContaining([{ path: '/', meta: PAGE_META.home }, ...routerPages]),
    );
    expect(SITE_PAGES).toHaveLength(routerPages.length + 1);
  });
});
