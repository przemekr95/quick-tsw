import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { Patron } from '../../../shared/types/domain';
import { PatronsWallSection } from './PatronsWallSection';

afterEach(() => {
  cleanup();
});

const patrons: Patron[] = [
  { name: 'Przyjaciel D', tier: 3 },
  { name: 'Mecenas Honorowy A', tier: 1, message: 'Trzymamy kciuki za cały sezon!' },
  { name: 'Mecenas B', tier: 2 },
];

describe('PatronsWallSection', () => {
  it('explains what the wall is and that every contribution counts', () => {
    render(<PatronsWallSection patrons={patrons} />);

    expect(screen.getByRole('heading', { name: 'Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getByText(/Nie ma tu wsparcia zbyt małego/)).toBeInTheDocument();
    expect(screen.getByText(/Dołączyć może każdy/)).toBeInTheDocument();
  });

  it('renders each patron as a comment-style entry with their tier badge', () => {
    render(<PatronsWallSection patrons={patrons} />);

    expect(screen.getByText('Mecenas Honorowy A')).toBeInTheDocument();
    expect(screen.getByText('Mecenas Honorowy')).toBeInTheDocument();
    expect(screen.getByText('Trzymamy kciuki za cały sezon!')).toBeInTheDocument();
    expect(screen.getByText('Przyjaciel D')).toBeInTheDocument();
    expect(screen.getByText('Przyjaciel Klubu')).toBeInTheDocument();
  });

  it('orders entries from the highest tier to the lowest', () => {
    render(<PatronsWallSection patrons={patrons} />);

    const names = screen.getAllByText(/^(Przyjaciel D|Mecenas Honorowy A|Mecenas B)$/);
    expect(names.map((el) => el.textContent)).toEqual([
      'Mecenas Honorowy A',
      'Mecenas B',
      'Przyjaciel D',
    ]);
  });

  it('omits the message paragraph when a patron left none', () => {
    render(<PatronsWallSection patrons={[{ name: 'Solo Patron', tier: 2 }]} />);

    expect(screen.getByText('Solo Patron')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });
});
