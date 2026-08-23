import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Player } from '../../../shared/types/domain';
import { PlayersSection } from './PlayersSection';

const players: Player[] = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    number: 12,
    position: 'Atakujący',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

describe('PlayersSection', () => {
  it('renders a card for every player', () => {
    render(<PlayersSection players={players} />);

    expect(screen.getByRole('heading', { name: 'Zawodnicy' })).toBeInTheDocument();
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByText('Atakujący')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Zdjęcie zawodnika nr 12, Jan Kowalski' }),
    ).toBeInTheDocument();
  });
});
