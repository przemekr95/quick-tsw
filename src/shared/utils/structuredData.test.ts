import { describe, expect, it } from 'vitest';
import type { ContactInfo, Player, StaffMember, UpcomingMatch } from '../types/domain';
import { findSitePage } from './sitePages';
import { breadcrumbJsonLd, menTeamJsonLd, nextMatchJsonLd } from './structuredData';

const SITE = 'https://siatkowka.example.pl';

const player: Player = {
  firstName: 'Jan',
  lastName: 'Kowalski',
  number: 7,
  position: 'Atakujący',
  photoSrc: '/images/team/jan.jpg',
};

const staff: StaffMember[] = [
  { role: 'Trener', firstName: 'Adam', lastName: 'Nowak', photoSrc: '/a.jpg' },
  { role: 'Statystyk', firstName: 'Ewa', lastName: 'Lis', photoSrc: '/e.jpg' },
];

const contact: ContactInfo = {
  address: 'ul. Reymonta 22, 30-059 Kraków',
  email: 'siatkowkamezczyzn@tswisla.pl',
  mapUrl: 'https://maps.example',
  nip: '1',
  krs: '2',
  bankAccountNumber: '3',
  bankAccountHolder: 'TS',
  coordinators: [
    {
      role: 'Koordynator sekcji',
      firstName: 'Piotr',
      lastName: 'Wiśniewski',
      phone: '+48 600 000 000',
      email: 'piotr@example.pl',
      photoSrc: '/p.jpg',
    },
  ],
  trainingGroups: [],
};

function match(overrides: Partial<UpcomingMatch>): UpcomingMatch {
  return {
    opponent: 'KS HUTNIK Kraków',
    competition: 'II LIGA MAŁOPOLSKA MĘŻCZYZN',
    location: 'home',
    matchDate: '2026-12-05',
    kickoffTime: '18:00',
    ...overrides,
  };
}

describe('menTeamJsonLd', () => {
  it('describes the men team with absolute URLs and its social profiles', () => {
    const team = menTeamJsonLd(SITE);

    expect(team).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'SportsTeam',
      url: `${SITE}/mezczyzni/klub`,
      logo: `${SITE}/tsw-herb.png`,
      gender: 'https://schema.org/Male',
    });
    expect(team).not.toHaveProperty('athlete');
    expect(team).not.toHaveProperty('coach');
    expect(team).not.toHaveProperty('contactPoint');
  });

  it('lists players as athletes and only coaches as coach', () => {
    const team = menTeamJsonLd(SITE, { players: [player], staff });

    expect(team.athlete).toEqual([{ '@type': 'Person', name: 'Jan Kowalski' }]);
    expect(team.coach).toEqual([{ '@type': 'Person', name: 'Adam Nowak' }]);
  });

  it('adds the contact details the Kontakt tab shows', () => {
    const team = menTeamJsonLd(SITE, { contact });

    expect(team).toMatchObject({
      email: 'siatkowkamezczyzn@tswisla.pl',
      address: 'ul. Reymonta 22, 30-059 Kraków',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Koordynator sekcji',
          name: 'Piotr Wiśniewski',
          telephone: '+48 600 000 000',
          email: 'piotr@example.pl',
        },
      ],
    });
  });
});

describe('nextMatchJsonLd', () => {
  it('describes a home match with the own team first', () => {
    expect(nextMatchJsonLd(SITE, match({ venue: 'Kraków, ul. Reymonta 22' }))).toMatchObject({
      '@type': 'SportsEvent',
      name: 'TS Wisła Kraków – KS HUTNIK Kraków',
      startDate: '2026-12-05T18:00:00+01:00',
      location: { '@type': 'Place', name: 'Kraków, ul. Reymonta 22' },
      url: `${SITE}/mezczyzni/klub`,
    });
  });

  it('puts the opponent first for an away match and uses the date alone without a kickoff time', () => {
    const event = nextMatchJsonLd(
      SITE,
      match({
        opponent: 'PROJEKT Myślenice',
        location: 'away',
        matchDate: '2026-12-12',
        kickoffTime: null,
        venue: 'Myślenice, ul. Zdrojowa 1',
      }),
    );

    expect(event).toMatchObject({
      name: 'PROJEKT Myślenice – TS Wisła Kraków',
      startDate: '2026-12-12',
      homeTeam: { name: 'PROJEKT Myślenice' },
      awayTeam: { name: 'TS Wisła Kraków' },
    });
  });

  it('has no event without a next match or without its venue', () => {
    expect(nextMatchJsonLd(SITE, undefined)).toBeNull();
    expect(nextMatchJsonLd(SITE, match({ venue: undefined }))).toBeNull();
  });
});

describe('breadcrumbJsonLd', () => {
  it('lists the trail from the home page with absolute URLs', () => {
    const druzyna = findSitePage('/mezczyzni/druzyna');
    if (!druzyna) throw new Error('missing druzyna page');

    expect(breadcrumbJsonLd(SITE, druzyna)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Siatkówka TS Wisła Kraków', item: `${SITE}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Siatkówka mężczyzn',
          item: `${SITE}/mezczyzni/klub`,
        },
        { '@type': 'ListItem', position: 3, name: 'Drużyna', item: `${SITE}/mezczyzni/druzyna` },
      ],
    });
  });

  it('has no trail for the home page itself', () => {
    const home = findSitePage('/');
    if (!home) throw new Error('missing home page');

    expect(breadcrumbJsonLd(SITE, home)).toBeNull();
  });
});
