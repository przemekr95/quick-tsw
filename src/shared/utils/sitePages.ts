import { MEN_SECTION_PATH, SITE_BRAND_NAME, SITE_URL } from './config';
import { PAGE_META, type PageMeta } from './pageMeta';

export interface SitePage {
  path: string;
  meta: PageMeta;
  // Name of the page in breadcrumb trails (structured data).
  breadcrumb: string;
}

const HOME_PAGE: SitePage = {
  path: '/',
  meta: PAGE_META.home,
  breadcrumb: SITE_BRAND_NAME,
};

const SECTION_HOME_PAGE: SitePage = {
  path: `${MEN_SECTION_PATH}/klub`,
  meta: PAGE_META.klub,
  breadcrumb: 'Siatkówka mężczyzn',
};

// Every indexable page: the build writes a static HTML file with its meta for
// each, and they make up the sitemap.
export const SITE_PAGES: SitePage[] = [
  HOME_PAGE,
  SECTION_HOME_PAGE,
  { path: `${MEN_SECTION_PATH}/druzyna`, meta: PAGE_META.druzyna, breadcrumb: 'Drużyna' },
  {
    path: `${MEN_SECTION_PATH}/przyjaciele`,
    meta: PAGE_META.przyjaciele,
    breadcrumb: 'Przyjaciele Białej Gwiazdy',
  },
  {
    path: `${MEN_SECTION_PATH}/zostan-partnerem`,
    meta: PAGE_META.zostanPartnerem,
    breadcrumb: 'Zostań Partnerem',
  },
  { path: `${MEN_SECTION_PATH}/kontakt`, meta: PAGE_META.kontakt, breadcrumb: 'Kontakt' },
  { path: `${MEN_SECTION_PATH}/media`, meta: PAGE_META.media, breadcrumb: 'Media' },
];

// The router matches case-insensitively and with a trailing slash, so
// /MEZCZYZNI/KLUB/ shows the same page as /mezczyzni/klub; this is the one
// address search engines should index.
export function canonicalPath(pathname: string): string {
  const normalize = (path: string) => path.toLowerCase().replace(/\/+$/, '') || '/';
  const normalized = normalize(pathname);

  try {
    // Encoded slashes must not introduce route segments.
    const decoded = normalize(
      pathname
        .split('/')
        .map((segment) => decodeURIComponent(segment).replaceAll('/', '%2F'))
        .join('/'),
    );

    // Unknown paths are also used as redirect targets; leave their escapes intact.
    return SITE_PAGES.find((page) => page.path === decoded)?.path ?? normalized;
  } catch {
    return normalized;
  }
}

export function absoluteUrl(path: string, siteUrl: string): string {
  return `${siteUrl}${path}`;
}

// In the browser: the configured domain, or — in a build without
// VITE_SITE_URL, e.g. local preview or a test deploy under a sub-path — the
// current origin plus the app's base path.
export function siteBaseUrl(): string {
  return SITE_URL || `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}`;
}

// Hosts that serve /mezczyzni/druzyna from mezczyzni/druzyna.html also answer
// the file's own address; this maps it (and .../index.html) back to the
// address the app routes, or null when the path isn't a file address.
export function pathFromHtmlFile(pathname: string): string | null {
  if (!pathname.toLowerCase().endsWith('.html')) return null;

  const withoutExtension = pathname.slice(0, -'.html'.length);
  const withoutIndex = withoutExtension.replace(/\/index$/i, '');

  return canonicalPath(withoutIndex === withoutExtension ? withoutExtension : `${withoutIndex}/`);
}

export function findSitePage(pathname: string): SitePage | undefined {
  const path = canonicalPath(pathname);

  return SITE_PAGES.find((page) => page.path === path);
}

export function breadcrumbTrail(page: SitePage): SitePage[] {
  if (page.path === HOME_PAGE.path) return [HOME_PAGE];
  if (page.path === SECTION_HOME_PAGE.path) return [HOME_PAGE, SECTION_HOME_PAGE];

  return [HOME_PAGE, SECTION_HOME_PAGE, page];
}
