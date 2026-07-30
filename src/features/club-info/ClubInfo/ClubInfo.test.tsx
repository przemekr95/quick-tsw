import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Club } from '../../../shared/types/domain';
import { ClubInfo } from './ClubInfo';

const club: Club = {
  name: 'Nazwa Klubu',
  history: 'Historia klubu',
  arenaAddress: 'Adres 1',
  board: ['A', 'B'],
  sponsors: [
    {
      name: 'S1',
      logoSrc: '/images/sponsors/k/msit.png',
      websiteUrl: 'https://example.com/s1',
    },
    {
      name: 'S2',
      logoSrc: '/images/sponsors/k/klub.png',
      websiteUrl: 'https://example.com/s2',
    },
  ],
};

const landingContent = {
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

    expect(screen.getAllByRole('img', { name: /zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'O klubie' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Poznaj drużynę.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Twoje miejsce jest na boisku.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Najbliższy mecz' })).toBeInTheDocument();
  });
});
