import { render, screen, within } from '@testing-library/react';
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
    points: 12,
    setsWon: 12,
    setsLost: 2,
    smallPointsWon: 340,
    smallPointsLost: 250,
  },
  {
    position: 6,
    team: 'TS WISŁA Kraków',
    played: 4,
    points: 6,
    setsWon: 8,
    setsLost: 7,
    smallPointsWon: 330,
    smallPointsLost: 321,
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
          onRetry={() => {}}
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
    expect(
      screen.getByRole('heading', { name: 'Najbliższy mecz: MKS Set Nowa Wieś' }),
    ).toBeInTheDocument();
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
          onRetry={() => {}}
          section="mezczyzni"
          standings={[]}
        />
      </MemoryRouter>,
    );

    expect(container.querySelector('#najblizszy-mecz')).not.toBeInTheDocument();
    expect(screen.getByText('Brak kolejnych meczów w terminarzu.')).toBeInTheDocument();
    expect(screen.getByText('Tabela ligowa pojawi się po rozpoczęciu sezonu.')).toBeInTheDocument();
    expect(screen.getByText('Brak rozegranych meczów w tym sezonie.')).toBeInTheDocument();
  });

  it('replaces the sections whose data failed to load with a retry notice', () => {
    const { container } = render(
      <MemoryRouter>
        <ClubInfo
          club={club}
          landingContent={landingContent}
          matches={null}
          onRetry={() => {}}
          players={null}
          section="mezczyzni"
          standings={null}
        />
      </MemoryRouter>,
    );
    const page = within(container);

    expect(page.getByRole('heading', { name: 'Twoje miejsce jest na boisku' })).toBeInTheDocument();
    expect(page.queryByRole('heading', { name: 'Poznaj drużynę' })).not.toBeInTheDocument();
    expect(container.querySelector('#najblizszy-mecz')).not.toBeInTheDocument();
    expect(page.queryByRole('heading', { name: 'Kolejne mecze' })).not.toBeInTheDocument();
    expect(page.queryByRole('heading', { name: 'Ostatnie wyniki' })).not.toBeInTheDocument();
    expect(page.queryByRole('heading', { name: 'Tabela ligowa' })).not.toBeInTheDocument();
    expect(page.getByRole('alert')).toHaveTextContent(
      'Nie udało się wczytać składu drużyny, meczów i tabeli ligowej.',
    );
    expect(page.getByRole('button', { name: 'Spróbuj ponownie' })).toBeInTheDocument();
  });
});
