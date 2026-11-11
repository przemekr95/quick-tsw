import type { ContactInfo, Player, StaffMember, UpcomingMatch } from '../types/domain';
import {
  CLUB_CREST_SRC,
  CLUB_SHORT_NAME,
  CLUB_WEBSITE_URL,
  FACEBOOK_NEWS_URL,
  INSTAGRAM_URL,
  MEN_SECTION_PATH,
} from './config';
import { toKickoffIso } from './matchSchedule';
import { absoluteUrl, breadcrumbTrail, type SitePage } from './sitePages';

export type JsonLd = Record<string, unknown>;

const CONTEXT = 'https://schema.org';
const SPORT = 'Siatkówka';

interface MenTeamDetails {
  players?: Player[];
  staff?: StaffMember[];
  contact?: ContactInfo;
}

function fullName({ firstName, lastName }: { firstName: string; lastName: string }): string {
  return `${firstName} ${lastName}`;
}

function person(someone: { firstName: string; lastName: string }): JsonLd {
  return { '@type': 'Person', name: fullName(someone) };
}

// Only facts the page itself shows: no field is filled in when the data
// doesn't have it.
export function menTeamJsonLd(
  siteUrl: string,
  { players = [], staff = [], contact }: MenTeamDetails = {},
): JsonLd {
  const coaches = staff.filter((member) => member.role === 'Trener');

  return {
    '@context': CONTEXT,
    '@type': 'SportsTeam',
    name: `${CLUB_SHORT_NAME} – siatkówka mężczyzn`,
    sport: SPORT,
    gender: 'https://schema.org/Male',
    url: absoluteUrl(`${MEN_SECTION_PATH}/klub`, siteUrl),
    logo: absoluteUrl(CLUB_CREST_SRC, siteUrl),
    sameAs: [FACEBOOK_NEWS_URL, INSTAGRAM_URL],
    parentOrganization: {
      '@type': 'SportsOrganization',
      name: CLUB_SHORT_NAME,
      url: CLUB_WEBSITE_URL,
    },
    ...(players.length > 0 && {
      athlete: players.map(person),
    }),
    ...(coaches.length > 0 && {
      coach: coaches.map(person),
    }),
    ...(contact && {
      email: contact.email,
      address: contact.address,
      contactPoint: contact.coordinators.map((coordinator) => ({
        '@type': 'ContactPoint',
        contactType: coordinator.role,
        name: fullName(coordinator),
        telephone: coordinator.phone,
        email: coordinator.email,
      })),
    }),
  };
}

// The next match is the only one whose venue the page shows (the rest of the
// schedule lists just home/away). Google requires a location for events, so
// without a venue in the data there is no event rather than a guessed one.
export function nextMatchJsonLd(siteUrl: string, match: UpcomingMatch | undefined): JsonLd | null {
  if (!match?.venue) return null;

  const ownTeam = { '@type': 'SportsTeam', name: CLUB_SHORT_NAME };
  const opponent = { '@type': 'SportsTeam', name: match.opponent };
  const [homeTeam, awayTeam] =
    match.location === 'home' ? [ownTeam, opponent] : [opponent, ownTeam];

  return {
    '@context': CONTEXT,
    '@type': 'SportsEvent',
    name: `${homeTeam.name} – ${awayTeam.name}`,
    description: match.competition,
    sport: SPORT,
    startDate: toKickoffIso(match) ?? match.matchDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    homeTeam,
    awayTeam,
    location: { '@type': 'Place', name: match.venue, address: match.venue },
    url: absoluteUrl(`${MEN_SECTION_PATH}/klub`, siteUrl),
  };
}

export function breadcrumbJsonLd(siteUrl: string, page: SitePage): JsonLd | null {
  const trail = breadcrumbTrail(page);

  if (trail.length < 2) return null;

  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.breadcrumb,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}
