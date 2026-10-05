import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { Player } from '../../../shared/types/domain';
import { PlayersSection } from './PlayersSection';

afterEach(() => {
  cleanup();
});

const photoSrc = '/images/backgrounds/hero-m.jpg';

const players: Player[] = [
  { firstName: 'Iwo', lastName: 'Libero', number: 16, position: 'Libero', photoSrc },
  { firstName: 'Jan', lastName: 'Kowalski', number: 12, position: 'Atakujący', photoSrc },
  { firstName: 'Adam', lastName: 'Środek', number: 7, position: 'Środkowy', photoSrc },
  { firstName: 'Piotr', lastName: 'Przyjmujący', number: 21, position: 'Przyjmujący', photoSrc },
  { firstName: 'Kamil', lastName: 'Rozgrywający', number: 9, position: 'Rozgrywający', photoSrc },
  { firstName: 'Olek', lastName: 'Drugi', number: 3, position: 'Przyjmujący', photoSrc },
];

describe('PlayersSection', () => {
  it('renders a card for every player', () => {
    render(<PlayersSection players={players} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Zdjęcie zawodnika nr 12, Jan Kowalski' }),
    ).toBeInTheDocument();
  });

  it('groups players under one heading per position, in court order', () => {
    render(<PlayersSection players={players} />);

    const positionHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(positionHeadings).toEqual([
      'Rozgrywający',
      'Atakujący',
      'Przyjmujący',
      'Środkowi',
      'Libero',
    ]);
    expect(
      within(screen.getByRole('list', { name: 'Środkowi' })).getByText('Adam Środek'),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: 'Libero' })).getByText('Iwo Libero'),
    ).toBeInTheDocument();
  });

  it('orders players within a position by shirt number', () => {
    render(<PlayersSection players={players} />);

    const names = within(screen.getByRole('list', { name: 'Przyjmujący' }))
      .getAllByRole('listitem')
      .map((item) => item.textContent);

    expect(names).toEqual(['3Olek Drugi', '21Piotr Przyjmujący']);
  });

  it('skips positions that have no players', () => {
    render(<PlayersSection players={[players[1]]} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Atakujący' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
  });

  it('links the card to the external player profile in a new tab', () => {
    const profileUrl = 'https://example.com/zawodnicy/jan-kowalski';

    render(<PlayersSection players={[{ ...players[1], profileUrl }]} />);

    const link = screen.getByRole('link', {
      name: 'Profil zawodnika Jan Kowalski (otwiera się w nowej karcie)',
    });

    expect(link).toHaveAttribute('href', profileUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the card without a link when the player has no profile URL', () => {
    render(<PlayersSection players={[players[1]]} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
