import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Player, StaffMember } from '../../../shared/types/domain';
import { TeamRoster } from './TeamRoster';

const players: Player[] = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    number: 12,
    position: 'Atakujący',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

const staff: StaffMember[] = [
  {
    role: 'Trener',
    firstName: 'Anna',
    lastName: 'Nowak',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
  {
    role: 'Statystyk',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

describe('TeamRoster', () => {
  it('renders the players and staff sections', () => {
    render(<TeamRoster players={players} staff={staff} />);

    expect(screen.getByRole('heading', { name: 'Zawodnicy' })).toBeInTheDocument();
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sztab' })).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    expect(screen.getByText('Piotr Wiśniewski')).toBeInTheDocument();
  });
});
