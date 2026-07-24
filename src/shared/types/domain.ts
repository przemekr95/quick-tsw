export type SectionId = 'kobiety' | 'mezczyzni';

export interface Club {
  name: string;
  history: string;
  arenaAddress: string;
  board: string[];
  sponsors: string[];
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
