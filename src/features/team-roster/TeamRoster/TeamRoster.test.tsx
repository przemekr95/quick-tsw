import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Player } from '../../../shared/types/domain';
import { TeamRoster } from './TeamRoster';

const players: Player[] = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    number: 12,
    position: 'Atakujący',
    photoPlaceholder: '[Zdjęcie]',
  },
];

describe('TeamRoster', () => {
  it('renders player list', () => {
    render(<TeamRoster players={players} />);

    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByText('#12')).toBeInTheDocument();
  });
});
