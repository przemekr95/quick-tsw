import { ACCOUNT_URL } from './config';
import { absoluteUrl, SITE_PAGES, type SitePage } from './sitePages';

export interface SeoFile {
  fileName: string;
  source: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Fails the build instead of silently shipping the generic meta when
// index.html no longer has the tag this expects. A replacer function keeps
// "$" in the text literal.
function replaceOnce(html: string, pattern: RegExp, replacement: string, what: string): string {
  if (!pattern.test(html)) {
    throw new Error(`index.html: nie znaleziono ${what}`);
  }

  return html.replace(pattern, () => replacement);
}

function setMetaContent(
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
): string {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`);

  if (!pattern.test(html)) {
    throw new Error(`index.html: nie znaleziono meta ${key}`);
  }

  return html.replace(pattern, (_match, before: string, after: string) => before + content + after);
}

export function renderPageHtml(templateHtml: string, page: SitePage, siteUrl: string): string {
  const title = escapeHtml(page.meta.title);
  const description = escapeHtml(page.meta.description);

  let html = replaceOnce(
    templateHtml,
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
    '<title>',
  );
  html = setMetaContent(html, 'name', 'description', description);
  html = setMetaContent(html, 'property', 'og:title', title);
  html = setMetaContent(html, 'property', 'og:description', description);

  // The home page's index.html is also what hosts serve for any unknown
  // address (SPA fallback), so a canonical link there would point every such
  // address at the home page. The home page gets its canonical from JS.
  if (!siteUrl || page.path === '/') return html;

  const url = escapeHtml(absoluteUrl(page.path, siteUrl));

  return replaceOnce(
    html,
    /<\/head>/,
    `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`,
    '</head>',
  );
}

// /mezczyzni/druzyna -> mezczyzni/druzyna.html: static hosts serve it at the
// address without the extension and without redirecting to a trailing slash,
// which a druzyna/index.html directory would trigger on some of them.
function pageFileName(page: SitePage): string {
  return page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
}

// robots.txt covers the whole host: the raw API and the separate player-zone
// app (Strefa zawodnika, behind a login) are not pages to index.
function robotsTxt(siteUrl: string): string {
  const sitemap = siteUrl ? `\nSitemap: ${absoluteUrl('/sitemap.xml', siteUrl)}\n` : '';

  return `User-agent: *\nDisallow: /api/\nDisallow: ${ACCOUNT_URL}\n${sitemap}`;
}

function sitemapXml(siteUrl: string): string {
  const urls = SITE_PAGES.map(
    (page) => `  <url>\n    <loc>${escapeHtml(absoluteUrl(page.path, siteUrl))}</loc>\n  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Files the build adds next to the SPA: a copy of index.html per page with
// that page's meta (crawlers that don't run JS, e.g. Facebook, read only
// this), robots.txt and, once the domain is known, sitemap.xml.
export function buildSeoFiles(templateHtml: string, siteUrl: string): SeoFile[] {
  const pages = SITE_PAGES.map((page) => ({
    fileName: pageFileName(page),
    source: renderPageHtml(templateHtml, page, siteUrl),
  }));
  // The page files create folders (mezczyzni/), and hosts answer a folder
  // address such as /mezczyzni/ from its index.html — without one they return
  // 404/403 instead of the app. Each folder gets the plain app shell (the home
  // page's index.html, which has no canonical link).
  const appShell = pages[0].source;
  const folders = new Set(
    pages
      .map((page) => page.fileName.split('/').slice(0, -1).join('/'))
      .filter((folder) => folder !== ''),
  );
  const folderIndexes = [...folders].map((folder) => ({
    fileName: `${folder}/index.html`,
    source: appShell,
  }));
  const robots = { fileName: 'robots.txt', source: robotsTxt(siteUrl) };

  return siteUrl
    ? [...pages, ...folderIndexes, robots, { fileName: 'sitemap.xml', source: sitemapXml(siteUrl) }]
    : [...pages, ...folderIndexes, robots];
}
