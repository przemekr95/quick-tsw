import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { StandingsRow } from '../../../shared/types/domain';
import { StandingsSection } from './StandingsSection';

afterEach(cleanup);

const standings: StandingsRow[] = [
  {
    position: 1,
    team: 'MUKS ISKIERKA Tarnów',
    played: 4,
    points: 12,
    setsWon: 12,
    setsLost: 2,
    smallPointsWon: 340,
    smallPointsLost: 250,
  },
  {
    position: 6,
    team: 'TS WISŁA Kraków',
    played: 4,
    points: 6,
    setsWon: 8,
    setsLost: 7,
    smallPointsWon: 330,
    smallPointsLost: 321,
    isOwnTeam: true,
  },
];

describe('StandingsSection', () => {
  it('renders every row with its position, team, matches played, sets, small points and points', () => {
    render(<StandingsSection standings={standings} />);

    expect(screen.getByRole('heading', { name: 'Tabela ligowa' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();

    expect(screen.getByText('MUKS ISKIERKA Tarnów')).toBeInTheDocument();
    expect(screen.getByText('12:2')).toBeInTheDocument();
    expect(screen.getByText('340:250')).toBeInTheDocument();

    expect(screen.getByText('TS WISŁA Kraków')).toBeInTheDocument();
    expect(screen.getByText('8:7')).toBeInTheDocument();
    expect(screen.getByText('330:321')).toBeInTheDocument();

    expect(screen.getAllByRole('columnheader').map((header) => header.textContent)).toEqual([
      'Lp.',
      'Drużyna',
      'Pkt',
      'M',
      'Sety',
      'Małe pkt',
    ]);
  });

  it('names MZPS as the source of the table and opens it in a new tab', () => {
    render(<StandingsSection standings={standings} />);

    const source = screen.getByRole('link', { name: /Małopolski Związek Piłki Siatkowej/ });
    expect(source).toHaveAttribute(
      'href',
      'https://www.mzps.pl/strefa-rozgrywek/ii-liga-mezczyzn/',
    );
    expect(source).toHaveAttribute('target', '_blank');
    expect(source).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('visually distinguishes the own team row', () => {
    render(<StandingsSection standings={standings} />);

    const ownTeamCell = screen.getByText('TS WISŁA Kraków');
    const row = ownTeamCell.closest('tr');
    const otherRow = screen.getByText('MUKS ISKIERKA Tarnów').closest('tr');

    expect(row?.className).not.toBe(otherRow?.className);
  });

  it('exposes the table as a keyboard-focusable, labelled scroll region', () => {
    render(<StandingsSection standings={standings} />);

    const scrollRegion = screen.getByRole('region', { name: 'Wiersze tabeli ligowej' });
    expect(scrollRegion).toHaveAttribute('tabIndex', '0');
    expect(scrollRegion.querySelector('table')).toBeInTheDocument();

    scrollRegion.focus();
    expect(scrollRegion).toHaveFocus();
  });

  it('renders a neutral empty state before the season has standings data', () => {
    render(<StandingsSection standings={[]} />);

    expect(screen.getByText('Tabela ligowa pojawi się po rozpoczęciu sezonu.')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Małopolski Związek/ })).not.toBeInTheDocument();
  });
});
