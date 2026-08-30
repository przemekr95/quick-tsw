import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Club, ClubLandingContent } from '../../../shared/types/domain';
import { ClubInfo } from './ClubInfo';

const club: Pick<Club, 'name' | 'history' | 'arenaAddress'> = {
  name: 'Nazwa Klubu',
  history: 'Historia klubu',
  arenaAddress: 'Adres 1',
};

const landingContent: ClubLandingContent = {
  heroHeading: 'Sekcja Kobiet',
  ctaLabel: 'Przejdź do treści',
  heroSlides: [
    { id: 'k-1', imageSrc: '/img/k-1.jpg', imageAlt: 'Slajd 1', title: 'Pasja', text: 'Opis' },
  ],
  rosterCards: [
    {
      name: 'Marco Rossi',
      position: 'Atakujący',
      number: '13',
      stats: 'Skuteczność ataku: 94%',
      imageSrc: '/images/backgrounds/hero-k.jpg',
    },
  ],
  recruitmentPaths: ['Akademia Młodzieżowa - 10 do 17 lat'],
  nextMatch: {
    opponent: 'MKS Set Nowa Wieś',
    competition: 'I liga kobiet',
    kickoffLabel: '15 sierpnia 2026, 19:00',
    venue: 'Hala Sportowa, ul. Sportowa 1',
  },
  matchCountdown: [{ value: '16', label: 'Dni' }],
  matchForm: ['W'],
};

describe('ClubInfo', () => {
  it('renders club section headings and images', () => {
    render(
      <MemoryRouter>
        <ClubInfo club={club} landingContent={landingContent} section="kobiety" />
      </MemoryRouter>,
    );

    expect(
      screen.getAllByRole('img', {
        name: /zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji/i,
      }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Nazwa Klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Poznaj drużynę' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Twoje miejsce jest na boisku' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'MKS Set Nowa Wieś' })).toBeInTheDocument();
  });
});
