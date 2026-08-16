export type SectionId = 'kobiety' | 'mezczyzni';

export type SectionPath = '/kobiety' | '/mezczyzni';

export type SponsorTier = 1 | 2 | 3;

export interface Sponsor {
  name: string;
  tier: SponsorTier;
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
  photoSrc: string;
}

export type StaffRole = 'Trener' | 'Statystyk';

export interface StaffMember {
  role: StaffRole;
  firstName: string;
  lastName: string;
  bio: string;
  photoSrc: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

export interface HeroSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
}

export interface ClubRosterCard {
  name: string;
  position: string;
  number: string;
  stats: string;
  imageSrc: string;
}

export interface ClubMatchCountdownItem {
  value: string;
  label: string;
}

export interface ClubNextMatch {
  opponent: string;
  competition: string;
  kickoffLabel: string;
  venue: string;
}

export interface ClubLandingContent {
  heroHeading: string;
  ctaLabel: string;
  heroSlides: HeroSlide[];
  rosterCards: ClubRosterCard[];
  recruitmentPaths: string[];
  nextMatch: ClubNextMatch;
  matchCountdown: ClubMatchCountdownItem[];
  matchForm: string[];
}
