import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { Player, StaffMember } from '../../../shared/types/domain';
import { TeamRoster } from './TeamRoster';

afterEach(() => {
  cleanup();
});

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
    expect(screen.getByRole('heading', { name: 'Sztab szkoleniowy' })).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    expect(screen.getByText('Piotr Wiśniewski')).toBeInTheDocument();
  });

  it('ends with a roster PDF download section', () => {
    render(<TeamRoster players={players} staff={staff} />);

    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Pobierz skład - Seniorzy/ });

    expect(link).toHaveAttribute('href', '/downloads/sklad-seniorzy2627.pdf');
    expect(link).toHaveAttribute('download');
  });

  it('leaves out the section whose data failed to load', () => {
    const { container } = render(<TeamRoster players={players} staff={null} />);
    const page = within(container);

    expect(page.getByRole('heading', { name: 'Zawodnicy' })).toBeInTheDocument();
    expect(page.queryByRole('heading', { name: 'Sztab szkoleniowy' })).not.toBeInTheDocument();
  });
});
