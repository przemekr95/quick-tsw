import { useEffect } from 'react';
import type { PageMeta } from '../utils/pageMeta';

function setNamedMeta(name: string, content: string | null): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (content === null) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.append(element);
  }

  element.content = content;
}

// Updates the static <title>/<meta> from index.html in place rather than
// rendering React 19 hoisted tags, which would add duplicates after them.
export function usePageMeta({ title, description, noindex = false }: PageMeta): void {
  useEffect(() => {
    document.title = title;
    setNamedMeta('description', description);
    setNamedMeta('robots', noindex ? 'noindex' : null);
  }, [title, description, noindex]);
}
