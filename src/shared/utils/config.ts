export const FACEBOOK_NEWS_URL = 'https://www.facebook.com/Tswsiatkowkamezczyzn';

export const CLUB_BRAND_NAME = 'Towarzystwo Sportowe Wisła Kraków';

export const CLUB_CREST_SRC = '/tsw-herb.png';

export const SECTION_TAB_LINKS = [
  { label: 'Klub', path: 'klub' },
  { label: 'Drużyna', path: 'druzyna' },
  { label: 'Strefa Przyjaciół', path: 'strefa-przyjaciol' },
  { label: 'Zostań Partnerem', path: 'zostan-partnerem' },
  { label: 'Kontakt', path: 'kontakt' },
] as const;

export const MEDIA_LINK = { label: 'Media', path: 'media' } as const;

export const MEDIA_DOWNLOADS = {
  brandBook: CLUB_CREST_SRC,
  rosterMezczyzni: '/downloads/sklad-mezczyzni.pdf',
} as const;
