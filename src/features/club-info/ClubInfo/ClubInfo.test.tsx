import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type {
  Club,
  ClubLandingContent,
  Player,
  StandingsRow,
  UpcomingMatch,
} from '../../../shared/types/domain';
import { ClubInfo } from './ClubInfo';

const club: Pick<Club, 'name' | 'history'> = {
  name: 'Nazwa Klubu',
  history: 'Historia klubu',
};

const landingContent: ClubLandingContent = {
  heroHeading: 'Sekcja Mężczyzn',
  heroSlides: [
    {
      id: 'm-1',
      imageSrc: '/img/m-1.jpg',
      imageAlt: 'Slajd 1',
      title: 'Pasja',
      text: 'Opis',
      ctaLabel: 'Przejdź do treści',
      ctaHref: '#section-content',
    },
  ],
  recruitmentPaths: ['Minisiatkówka - roczniki 2014-2016'],
  matchForm: ['W'],
};

const players: Player[] = [
  {
    firstName: 'Wojciech',
    lastName: 'Rubacha',
    number: 8,
    position: 'Atakujący',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

const FAR_FUTURE_MATCH_DATE = '2999-08-15';
const FAR_FUTURE_MATCH_DATE_LATER = '2999-08-22';

const matches: UpcomingMatch[] = [
  {
    round: 1,
    opponent: 'MKS Set Nowa Wieś',
    competition: 'I liga mężczyzn',
    location: 'away',
    matchDate: FAR_FUTURE_MATCH_DATE,
    kickoffTime: '19:00',
  },
  {
    round: 2,
    opponent: 'UKS Set Kraków',
    competition: 'I liga mężczyzn',
    location: 'home',
    matchDate: FAR_FUTURE_MATCH_DATE_LATER,
    kickoffTime: null,
  },
  {
    round: 0,
    opponent: 'AZS AGH Kraków',
    competition: 'I liga mężczyzn',
    location: 'away',
    matchDate: '2020-01-01',
    kickoffTime: '18:00',
    result: {
      sets: [
        { scored: 25, conceded: 20 },
        { scored: 20, conceded: 25 },
        { scored: 25, conceded: 22 },
        { scored: 22, conceded: 25 },
        { scored: 15, conceded: 12 },
      ],
    },
  },
];

const standings: StandingsRow[] = [
  {
    position: 1,
    team: 'MUKS ISKIERKA Tarnów',
    played: 4,
    wins: 4,
    losses: 0,
    setsWon: 12,
    setsLost: 2,
    points: 12,
  },
  {
    position: 6,
    team: 'TS WISŁA Kraków',
    played: 4,
    wins: 2,
    losses: 2,
    setsWon: 8,
    setsLost: 7,
    points: 6,
    isOwnTeam: true,
  },
];

describe('ClubInfo', () => {
  it('renders club section headings and images', () => {
    render(
      <MemoryRouter>
        <ClubInfo
          club={club}
          landingContent={landingContent}
          matches={matches}
          players={players}
          section="mezczyzni"
          standings={standings}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getAllByRole('img', {
        name: /zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji/i,
      }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Nazwa Klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Poznaj drużynę' })).toBeInTheDocument();
    expect(screen.getByText('Wojciech Rubacha')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Twoje miejsce jest na boisku' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'MKS Set Nowa Wieś' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kolejne mecze' })).toBeInTheDocument();
    expect(screen.getByText('UKS Set Kraków')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ostatnie wyniki' })).toBeInTheDocument();
    expect(screen.getByText('AZS AGH Kraków')).toBeInTheDocument();
    expect(screen.getByText('3:2')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tabela ligowa' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('MUKS ISKIERKA Tarnów')).toBeInTheDocument();
  });

  it('hides the next-match hero once the season has no fixtures left', () => {
    const { container } = render(
      <MemoryRouter>
        <ClubInfo
          club={club}
          landingContent={landingContent}
          matches={[]}
          players={players}
          section="mezczyzni"
          standings={[]}
        />
      </MemoryRouter>,
    );

    expect(container.querySelector('#najblizszy-mecz')).not.toBeInTheDocument();
    expect(screen.getByText('Brak kolejnych meczów w terminarzu.')).toBeInTheDocument();
    expect(
      screen.getByText('Tabela ligowa pojawi się po rozpoczęciu sezonu.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Brak rozegranych meczów w tym sezonie.')).toBeInTheDocument();
  });
});
