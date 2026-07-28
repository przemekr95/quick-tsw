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

describe('ClubInfo', () => {
  it('renders club page with four Ferrari-style sections', () => {
    render(
      <MemoryRouter>
        <ClubInfo club={club} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('img', { name: /zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'O klubie' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nasza drużyna' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dołącz do nas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Najbliższy mecz' })).toBeInTheDocument();
  });
});
