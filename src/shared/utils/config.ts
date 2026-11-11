import type { SectionPath } from '../types/domain';

export const MEN_SECTION_PATH = '/mezczyzni' satisfies SectionPath;

// Publiczny adres serwisu (bez końcowego „/”) z VITE_SITE_URL; pusty, gdy build nie zna domeny.
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

export const FACEBOOK_NEWS_URL = 'https://www.facebook.com/Tswsiatkowkamezczyzn';

export const INSTAGRAM_URL = 'https://www.instagram.com/tswisla_siatkowkamezczyzn/';

export const CLUB_BRAND_NAME = 'Towarzystwo Sportowe Wisła Kraków';

export const CLUB_SHORT_NAME = 'TS Wisła Kraków';

// Nazwa całego serwisu (ekran wyboru, ścieżki nawigacji, tytuły bez sekcji).
export const SITE_BRAND_NAME = `Siatkówka ${CLUB_SHORT_NAME}`;

// Id głównej treści sekcji (`<main>` w SectionLayout); fokus wraca tu, gdy
// znika przycisk, który go miał (np. „Spróbuj ponownie”).
export const MAIN_CONTENT_ID = 'section-content';

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
