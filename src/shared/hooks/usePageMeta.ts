import { useEffect } from 'react';
import type { PageMeta } from '../utils/pageMeta';
import { absoluteUrl, canonicalPath, siteBaseUrl } from '../utils/sitePages';

// Finds the <head> tag matching `selector` and sets its attributes, creating
// it if needed; `null` removes it.
function upsertHeadTag(
  selector: string,
  tagName: 'meta' | 'link',
  attributes: Record<string, string> | null,
): void {
  let element = document.head.querySelector(selector);

  if (attributes === null) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement(tagName);
    document.head.append(element);
  }

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
}

function setMeta(attribute: 'name' | 'property', key: string, content: string | null): void {
  upsertHeadTag(
    `meta[${attribute}="${key}"]`,
    'meta',
    content === null ? null : { [attribute]: key, content },
  );
}

function setCanonical(href: string | null): void {
  upsertHeadTag('link[rel="canonical"]', 'link', href === null ? null : { rel: 'canonical', href });
}

// Updates the static <title>/<meta> from index.html (or the page's prebuilt
// copy) in place rather than rendering React 19 hoisted tags, which would add
// duplicates after them. `pathname` is the router location, used for the
// canonical address.
export function usePageMeta(
  { title, description, noindex = false }: PageMeta,
  pathname: string,
): void {
  useEffect(() => {
    const url = noindex ? null : absoluteUrl(canonicalPath(pathname), siteBaseUrl());

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex' : null);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setCanonical(url);
  }, [title, description, noindex, pathname]);
}
