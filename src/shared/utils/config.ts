import type { SectionPath } from '../types/domain';

export const MEN_SECTION_PATH = '/mezczyzni' satisfies SectionPath;

export const FACEBOOK_NEWS_URL = 'https://www.facebook.com/Tswsiatkowkamezczyzn';

export const INSTAGRAM_URL = 'https://www.instagram.com/tswisla_siatkowkamezczyzn/';

export const CLUB_BRAND_NAME = 'Towarzystwo Sportowe Wisła Kraków';

export const CLUB_CREST_SRC = '/tsw-herb.png';

export const CLUB_WEBSITE_URL = 'https://www.tswisla.pl/';

// Sekcja kobiet nie ma własnych podstron — ekran startowy kieruje na jej kategorię na stronie klubu.
export const WOMEN_SECTION_URL = 'https://www.tswisla.pl/category/siatkowka-kobiet/';

export const SECTION_TAB_LINKS = [
  { label: 'Klub', path: 'klub' },
  { label: 'Drużyna', path: 'druzyna' },
  { label: 'Przyjaciele', path: 'przyjaciele' },
  { label: 'Zostań Partnerem', path: 'zostan-partnerem' },
  { label: 'Kontakt', path: 'kontakt' },
] as const;

export const FOOTER_LINKS = [
  { label: 'Media', path: 'media' },
  { label: 'Kontakt', path: 'kontakt' },
] as const;

// Strefa zawodnika to osobna aplikacja (repo quick-tsw-konto) na tej samej domenie.
export const ACCOUNT_URL = '/konto/';

export const MEDIA_DOWNLOADS = {
  brandBook: '/downloads/Ksiega-Znaku-TS-Wisla-Krakow.pdf',
  rosterMezczyzni: '/downloads/sklad-seniorzy2627.pdf',
} as const;
