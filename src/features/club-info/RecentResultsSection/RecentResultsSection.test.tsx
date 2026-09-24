import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { PlayedMatch } from '../../../shared/types/domain';
import { RecentResultsSection } from './RecentResultsSection';

afterEach(cleanup);

const results: PlayedMatch[] = [
  {
    round: 5,
    opponent: 'KS DALIN Myślenice',
    competition: 'II LIGA MAŁOPOLSKA MĘŻCZYZN',
    location: 'home',
    matchDate: '2026-12-05',
    kickoffTime: '18:00',
    result: {
      sets: [
        { scored: 25, conceded: 20 },
        { scored: 22, conceded: 25 },
        { scored: 25, conceded: 18 },
        { scored: 25, conceded: 23 },
      ],
    },
  },
  {
    round: 4,
    opponent: 'HUTNIK Kraków',
    competition: 'II LIGA MAŁOPOLSKA MĘŻCZYZN',
    location: 'away',
    matchDate: '2026-11-28',
    kickoffTime: '17:00',
    result: {
      sets: [
        { scored: 20, conceded: 25 },
        { scored: 25, conceded: 22 },
        { scored: 18, conceded: 25 },
        { scored: 23, conceded: 25 },
      ],
    },
  },
];

describe('RecentResultsSection', () => {
  it('renders every result with its round, date, opponent, location, outcome, set score and set-by-set breakdown', () => {
    render(<RecentResultsSection results={results} />);

    expect(screen.getByRole('heading', { name: 'Ostatnie wyniki' })).toBeInTheDocument();

    expect(screen.getByText('KS DALIN Myślenice')).toBeInTheDocument();
    expect(screen.getByText('Kolejka 5')).toBeInTheDocument();
    expect(screen.getByText('05.12.2026')).toBeInTheDocument();
    expect(screen.getByText('U siebie')).toBeInTheDocument();
    expect(screen.getByText('3:1')).toBeInTheDocument();
    expect(screen.getByText('25:20, 22:25, 25:18, 25:23')).toBeInTheDocument();

    expect(screen.getByText('HUTNIK Kraków')).toBeInTheDocument();
    expect(screen.getByText('Kolejka 4')).toBeInTheDocument();
    expect(screen.getByText('28.11.2026')).toBeInTheDocument();
    expect(screen.getByText('Wyjazd')).toBeInTheDocument();
    expect(screen.getByText('1:3')).toBeInTheDocument();
    expect(screen.getByText('20:25, 25:22, 18:25, 23:25')).toBeInTheDocument();
  });

  it('marks a win and a loss with distinct outcome badges', () => {
    render(<RecentResultsSection results={results} />);

    const badges = screen.getAllByText(/^[WP]$/);
    expect(badges.map((badge) => badge.textContent)).toEqual(['W', 'P']);
  });

  it('renders a neutral empty state when no matches have been played yet', () => {
    render(<RecentResultsSection results={[]} />);

    expect(screen.getByText('Brak rozegranych meczów w tym sezonie.')).toBeInTheDocument();
  });

  it('falls back to the competition name when a played match has no league round, e.g. a friendly', () => {
    const friendly: PlayedMatch = {
      opponent: 'FOTONLAB GRYF Miechów',
      competition: 'Sparing',
      location: 'away',
      matchDate: '2026-09-10',
      kickoffTime: null,
      result: {
        sets: [
          { scored: 18, conceded: 25 },
          { scored: 25, conceded: 23 },
          { scored: 25, conceded: 22 },
          { scored: 19, conceded: 25 },
          { scored: 13, conceded: 25 },
        ],
      },
    };

    render(<RecentResultsSection results={[friendly]} />);

    expect(screen.getByText('Sparing')).toBeInTheDocument();
    expect(screen.getByText('2:3')).toBeInTheDocument();
    expect(screen.queryByText(/^Kolejka/)).not.toBeInTheDocument();
  });
});
