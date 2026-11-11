import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SITE_URL } from '../utils/config';
import type { PageMeta } from '../utils/pageMeta';
import { usePageMeta } from './usePageMeta';

afterEach(() => {
  cleanup();
  document.head
    .querySelectorAll('meta[name], meta[property], link[rel="canonical"]')
    .forEach((element) => element.remove());
});

function Page({ meta, pathname = '/mezczyzni/klub' }: { meta: PageMeta; pathname?: string }) {
  usePageMeta(meta, pathname);

  return null;
}

function metaContent(name: string): string | null {
  return document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? null;
}

function ogContent(property: string): string | null {
  return (
    document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.content ?? null
  );
}

// Same base as the hook, so the test also holds for a build without VITE_SITE_URL.
const siteBase = SITE_URL || window.location.origin;

function canonicalHref(): string | null {
  return document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? null;
}

describe('usePageMeta', () => {
  it('sets the document title and description', () => {
    render(<Page meta={{ title: 'Drużyna | Klub', description: 'Opis drużyny.' }} />);

    expect(document.title).toBe('Drużyna | Klub');
    expect(metaContent('description')).toBe('Opis drużyny.');
    expect(metaContent('robots')).toBeNull();
  });

  it('updates the existing description tag instead of adding another one', () => {
    const { rerender } = render(<Page meta={{ title: 'A', description: 'Pierwszy opis.' }} />);

    rerender(<Page meta={{ title: 'B', description: 'Drugi opis.' }} />);

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(metaContent('description')).toBe('Drugi opis.');
    expect(document.title).toBe('B');
  });

  it('adds a noindex robots tag only while the page asks for it', () => {
    const { rerender } = render(
      <Page meta={{ title: '404', description: 'Brak strony.', noindex: true }} />,
    );

    expect(metaContent('robots')).toBe('noindex');

    rerender(<Page meta={{ title: 'Klub', description: 'Opis klubu.' }} />);

    expect(metaContent('robots')).toBeNull();
  });

  it('points the canonical address and og:url at the lowercase path without a trailing slash', () => {
    render(
      <Page
        meta={{ title: 'Drużyna', description: 'Opis drużyny.' }}
        pathname="/MEZCZYZNI/Druzyna/"
      />,
    );

    expect(canonicalHref()).toBe(`${siteBase}/mezczyzni/druzyna`);
    expect(ogContent('og:url')).toBe(`${siteBase}/mezczyzni/druzyna`);
    expect(ogContent('og:title')).toBe('Drużyna');
    expect(ogContent('og:description')).toBe('Opis drużyny.');
  });

  it('keeps the home page canonical at the site root', () => {
    render(<Page meta={{ title: 'Siatkówka', description: 'Opis.' }} pathname="/" />);

    expect(canonicalHref()).toBe(`${siteBase}/`);
  });

  it('drops the canonical address and og:url on a noindex page', () => {
    const { rerender } = render(<Page meta={{ title: 'Klub', description: 'Opis klubu.' }} />);

    rerender(<Page meta={{ title: '404', description: 'Brak strony.', noindex: true }} />);

    expect(canonicalHref()).toBeNull();
    expect(ogContent('og:url')).toBeNull();
  });
});
