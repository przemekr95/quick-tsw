export type SectionId = 'mezczyzni';

export type SectionPath = '';

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
  board: string[];
  sponsors: Sponsor[];
}

export type PatronTier = 1 | 2 | 3;

export interface Patron {
  name: string;
  tier: PatronTier;
  message?: string;
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
  photoSrc: string;
}

export type CoordinatorRole = 'Koordynator sekcji' | 'Zastępca koordynatora';

export interface SectionCoordinator {
  role: CoordinatorRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photoSrc: string;
}

export interface TrainingSession {
  day: string;
  time: string;
}

export interface TrainingGroup {
  name: string;
  venue: string;
  address: string;
  mapUrl: string;
  sessions: TrainingSession[];
}

export interface ContactInfo {
  address: string;
  email: string;
  mapUrl: string;
  nip: string;
  krs: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  coordinators: SectionCoordinator[];
  trainingGroups: TrainingGroup[];
}

export interface HeroSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ClubMatchCountdownItem {
  value: string;
  label: string;
}

export interface ClubNextMatch {
  opponent: string;
  competition: string;
  kickoffLabel: string;
  kickoffAt: string;
  venue: string;
}

export type MatchFormResult = 'W' | 'P' | '-';

export type MatchLocation = 'home' | 'away';

export interface UpcomingMatch {
  /** Numer kolejki ligowej (1-14 w sezonie 2026/2027). */
  round: number;
  opponent: string;
  competition: string;
  location: MatchLocation;
  /** Data meczu w formacie ISO (YYYY-MM-DD). */
  matchDate: string;
  /** Godzina w formacie HH:mm, lub null, gdy termin nie został jeszcze ustalony (TBD). */
  kickoffTime: string | null;
}

export interface ClubLandingContent {
  heroHeading: string;
  heroSlides: HeroSlide[];
  recruitmentPaths: string[];
  nextMatch: ClubNextMatch;
  matchForm: MatchFormResult[];
}

export type PartnershipTierKey = 'primary' | 'secondary' | 'tertiary';

export interface PartnershipTier {
  key: PartnershipTierKey;
  name: string;
  description: string;
  perks: string[];
}

export interface PartnershipContent {
  leadText: string;
  benefits: string[];
  tiers: PartnershipTier[];
  waysLeadText: string;
  ways: string[];
}
