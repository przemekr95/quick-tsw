export type SectionId = 'kobiety' | 'mezczyzni';

export interface Sponsor {
  name: string;
  logoSrc?: string;
  websiteUrl?: string;
}

export interface Club {
  name: string;
  history: string;
  arenaAddress: string;
  board: string[];
  sponsors: Sponsor[];
}

export interface Player {
  firstName: string;
  lastName: string;
  number: number;
  position: string;
  photoPlaceholder: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}
