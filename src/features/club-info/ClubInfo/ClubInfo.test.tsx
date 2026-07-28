import { render, screen } from '@testing-library/react';
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
  it('renders modern club layout with images and sponsors', () => {
    render(<ClubInfo club={club} />);

    expect(screen.getByText('Nazwa Klubu')).toBeInTheDocument();
    expect(screen.getByText('Historia klubu')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sponsorzy' })).toBeInTheDocument();
  });
});
