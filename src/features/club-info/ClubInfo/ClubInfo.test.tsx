import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Club, ClubLandingContent, Player, UpcomingMatch } from '../../../shared/types/domain';
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
        />
      </MemoryRouter>,
    );

    expect(container.querySelector('#najblizszy-mecz')).not.toBeInTheDocument();
    expect(screen.getByText('Brak kolejnych meczów w terminarzu.')).toBeInTheDocument();
  });
});
