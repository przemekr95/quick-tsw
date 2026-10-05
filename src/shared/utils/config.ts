export const FACEBOOK_NEWS_URL = 'https://www.facebook.com/Tswsiatkowkamezczyzn';

export const INSTAGRAM_URL = 'https://www.instagram.com/tswisla_siatkowkamezczyzn/';

export const CLUB_BRAND_NAME = 'Towarzystwo Sportowe Wisła Kraków';

export const CLUB_CREST_SRC = '/tsw-herb.png';

export const CLUB_WEBSITE_URL = 'https://www.tswisla.pl/';

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

export const MEDIA_DOWNLOADS = {
  brandBook: CLUB_CREST_SRC,
  rosterMezczyzni: '/downloads/sklad-mezczyzni.pdf',
} as const;
