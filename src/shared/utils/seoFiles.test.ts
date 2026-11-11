import { describe, expect, it } from 'vitest';
import indexHtml from '../../../index.html?raw';
import { buildSeoFiles, renderPageHtml } from './seoFiles';
import { SITE_PAGES } from './sitePages';

const SITE = 'https://siatkowka.example.pl';

function fileByName(files: { fileName: string; source: string }[], fileName: string): string {
  const file = files.find((candidate) => candidate.fileName === fileName);

  if (!file) throw new Error(`missing ${fileName}`);

  return file.source;
}

describe('renderPageHtml', () => {
  it("puts the page's title, description and canonical address into the real index.html", () => {
    const druzyna = SITE_PAGES.find((page) => page.path === '/mezczyzni/druzyna');
    if (!druzyna) throw new Error('missing druzyna page');

    const html = renderPageHtml(indexHtml, druzyna, SITE);

    expect(html).toContain(`<title>${druzyna.meta.title}</title>`);
    expect(html).toMatch(new RegExp(`name="description"\\s+content="${druzyna.meta.description}"`));
    expect(html).toContain(`<meta property="og:title" content="${druzyna.meta.title}" />`);
    expect(html).toMatch(
      new RegExp(`property="og:description"\\s+content="${druzyna.meta.description}"`),
    );
    expect(html).toContain(`<link rel="canonical" href="${SITE}/mezczyzni/druzyna" />`);
    expect(html).toContain(`<meta property="og:url" content="${SITE}/mezczyzni/druzyna" />`);
  });

  it('escapes HTML and keeps "$" literal in the text', () => {
    const page = {
      path: '/x',
      breadcrumb: 'X',
      meta: { title: 'A & "B" $1 <c>', description: 'Cena $& 5 zł' },
    };

    const html = renderPageHtml(indexHtml, page, SITE);

    expect(html).toContain('<title>A &amp; &quot;B&quot; $1 &lt;c&gt;</title>');
    expect(html).toContain('content="Cena $&amp; 5 zł"');
  });

  it('leaves the canonical address out of index.html, which hosts also serve for unknown URLs', () => {
    const html = renderPageHtml(indexHtml, SITE_PAGES[0], SITE);

    expect(SITE_PAGES[0].path).toBe('/');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('og:url');
  });

  it('leaves out the canonical address when the site URL is unknown', () => {
    const html = renderPageHtml(indexHtml, SITE_PAGES[1], '');

    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('og:url');
  });

  it('fails loudly when index.html no longer has a tag it fills in', () => {
    expect(() => renderPageHtml('<html><head></head></html>', SITE_PAGES[0], SITE)).toThrow(
      'index.html: nie znaleziono <title>',
    );
  });
});

describe('buildSeoFiles', () => {
  it('writes a file per page next to the extensionless address, plus robots.txt and sitemap.xml', () => {
    const files = buildSeoFiles(indexHtml, SITE);

    expect(files.map((file) => file.fileName)).toEqual([
      'index.html',
      'mezczyzni/klub.html',
      'mezczyzni/druzyna.html',
      'mezczyzni/przyjaciele.html',
      'mezczyzni/zostan-partnerem.html',
      'mezczyzni/kontakt.html',
      'mezczyzni/media.html',
      'mezczyzni/index.html',
      'robots.txt',
      'sitemap.xml',
    ]);
    expect(fileByName(files, 'mezczyzni/index.html')).toBe(fileByName(files, 'index.html'));
    expect(fileByName(files, 'mezczyzni/index.html')).not.toContain('rel="canonical"');
    expect(fileByName(files, 'robots.txt')).toBe(
      `User-agent: *\nDisallow: /api/\nDisallow: /konto/\n\nSitemap: ${SITE}/sitemap.xml\n`,
    );

    const sitemap = fileByName(files, 'sitemap.xml');
    for (const page of SITE_PAGES) {
      expect(sitemap).toContain(`<loc>${SITE}${page.path}</loc>`);
    }
  });

  it('skips the sitemap and its robots.txt line until the site URL is known', () => {
    const files = buildSeoFiles(indexHtml, '');

    expect(files.map((file) => file.fileName)).not.toContain('sitemap.xml');
    expect(fileByName(files, 'robots.txt')).toBe(
      'User-agent: *\nDisallow: /api/\nDisallow: /konto/\n',
    );
  });
});
