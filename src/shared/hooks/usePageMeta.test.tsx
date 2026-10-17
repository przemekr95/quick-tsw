import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { PageMeta } from '../utils/pageMeta';
import { usePageMeta } from './usePageMeta';

afterEach(() => {
  cleanup();
  document.head.querySelectorAll('meta[name]').forEach((element) => element.remove());
});

function Page({ meta }: { meta: PageMeta }) {
  usePageMeta(meta);

  return null;
}

function metaContent(name: string): string | null {
  return document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? null;
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
});
