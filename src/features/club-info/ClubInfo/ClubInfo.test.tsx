import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Club, ClubLandingContent, Player } from '../../../shared/types/domain';
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
  nextMatch: {
    opponent: 'MKS Set Nowa Wieś',
    competition: 'I liga mężczyzn',
    kickoffLabel: '15 sierpnia 2026, 19:00',
    kickoffAt: '2026-08-15T19:00:00+02:00',
    venue: 'Hala Sportowa, ul. Sportowa 1',
  },
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

describe('ClubInfo', () => {
  it('renders club section headings and images', () => {
    render(
      <MemoryRouter>
        <ClubInfo
          club={club}
          landingContent={landingContent}
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
  });
});
