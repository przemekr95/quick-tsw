export interface PageMeta {
  title: string;
  description: string;
  // Page-level <h1> for tabs without the hero (the Klub hero renders its own).
  heading?: string;
  noindex?: boolean;
}

// Attached to routes as `handle` so metadata follows the route React Router
// actually matched (case-insensitive, percent-decoded), not the raw URL.
export interface PageMetaHandle {
  pageMeta: PageMeta;
}

const SITE_NAME = 'Siatkówka mężczyzn TS Wisła Kraków';

export const PAGE_META = {
  klub: {
    title: 'Siatkówka mężczyzn – TS Wisła Kraków',
    description:
      'Oficjalna strona sekcji siatkówki mężczyzn TS Wisła Kraków. Terminarz i wyniki meczów, tabela ligowa, skład drużyny i historia sięgająca 1927 roku.',
  },
  druzyna: {
    title: `Drużyna | ${SITE_NAME}`,
    description:
      'Poznaj zawodników i sztab szkoleniowy drużyny siatkówki mężczyzn TS Wisła Kraków – skład, pozycje i numery na sezon 2026/27.',
    heading: 'Drużyna siatkówki mężczyzn TS Wisła Kraków',
  },
  kontakt: {
    title: `Kontakt | ${SITE_NAME}`,
    description:
      'Skontaktuj się z sekcją siatkówki mężczyzn TS Wisła Kraków – dane kontaktowe, koordynatorzy i harmonogram treningów. Dołącz do drużyny!',
    heading: 'Kontakt z sekcją siatkówki mężczyzn TS Wisła Kraków',
  },
  przyjaciele: {
    title: `Przyjaciele Białej Gwiazdy | ${SITE_NAME}`,
    description:
      'Przyjaciele Białej Gwiazdy – osoby i firmy, które wspierają sekcję siatkówki mężczyzn TS Wisła Kraków. Dołącz do grona wspierających.',
    heading: 'Przyjaciele Białej Gwiazdy – wspierający siatkówkę mężczyzn TS Wisła Kraków',
  },
  zostanPartnerem: {
    title: `Zostań Partnerem | ${SITE_NAME}`,
    description:
      'Zostań partnerem sekcji siatkówki mężczyzn TS Wisła Kraków – pakiety partnerskie, ekspozycja marki podczas meczów i elastyczne formy współpracy.',
    heading: 'Zostań Partnerem siatkówki mężczyzn TS Wisła Kraków',
  },
  media: {
    title: `Media | ${SITE_NAME}`,
    description:
      'Materiały dla mediów i partnerów: księga znaku TS Wisła Kraków, kolory klubu i skład drużyny siatkówki mężczyzn do pobrania.',
    heading: 'Materiały dla mediów – siatkówka mężczyzn TS Wisła Kraków',
  },
  notFound: {
    title: `Nie znaleziono strony | ${SITE_NAME}`,
    description: 'Strona, której szukasz, nie istnieje albo została przeniesiona.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

function isPageMetaHandle(handle: unknown): handle is PageMetaHandle {
  return typeof handle === 'object' && handle !== null && 'pageMeta' in handle;
}

// A route without a handle falls back to the indexable site defaults rather
// than to the noindex not-found meta, so a forgotten handle cannot hide a page.
export function getRoutePageMeta(matches: readonly { handle: unknown }[]): PageMeta {
  const handle = matches.findLast((match) => isPageMetaHandle(match.handle))?.handle;

  return isPageMetaHandle(handle) ? handle.pageMeta : PAGE_META.klub;
}
