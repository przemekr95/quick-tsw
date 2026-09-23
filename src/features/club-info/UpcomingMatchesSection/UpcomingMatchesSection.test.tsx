import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { UpcomingMatch } from '../../../shared/types/domain';
import { UpcomingMatchesSection } from './UpcomingMatchesSection';

const matches: UpcomingMatch[] = [
  {
    round: 2,
    opponent: 'KS HUTNIK Kraków',
    competition: 'II LIGA MAŁOPOLSKA MĘŻCZYZN',
    location: 'home',
    matchDate: '2026-11-14',
    kickoffTime: null,
  },
  {
    round: 3,
    opponent: 'MUKS SOKÓŁ Gumniska Tarnów',
    competition: 'II LIGA MAŁOPOLSKA MĘŻCZYZN',
    location: 'away',
    matchDate: '2026-11-21',
    kickoffTime: '17:30',
  },
];

describe('UpcomingMatchesSection', () => {
  it('renders every match with its round, date, opponent, location and time', () => {
    render(<UpcomingMatchesSection matches={matches} />);

    expect(screen.getByRole('heading', { name: 'Kolejne mecze' })).toBeInTheDocument();
    expect(screen.getByText('KS HUTNIK Kraków')).toBeInTheDocument();
    expect(screen.getByText('Kolejka 2')).toBeInTheDocument();
    expect(screen.getByText('14.11.2026')).toBeInTheDocument();
    expect(screen.getByText('U siebie')).toBeInTheDocument();
    expect(screen.getByText('TBD')).toBeInTheDocument();

    expect(screen.getByText('MUKS SOKÓŁ Gumniska Tarnów')).toBeInTheDocument();
    expect(screen.getByText('Kolejka 3')).toBeInTheDocument();
    expect(screen.getByText('21.11.2026')).toBeInTheDocument();
    expect(screen.getByText('Wyjazd')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
  });

  it('renders a placeholder message when there are no more matches left', () => {
    render(<UpcomingMatchesSection matches={[]} />);

    expect(screen.getByText('Kolejne terminy zostaną ogłoszone wkrótce.')).toBeInTheDocument();
  });
});
