import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UpcomingMatch } from '../../../shared/types/domain';
import { NextMatchSection } from './NextMatchSection';

afterEach(cleanup);

const match: UpcomingMatch = {
  round: 1,
  opponent: 'MKS Set Nowa Wieś',
  competition: 'I liga mężczyzn',
  location: 'away',
  matchDate: '2026-08-15',
  kickoffTime: '19:00',
};

const matchWithoutKickoffTime: UpcomingMatch = {
  ...match,
  round: 2,
  opponent: 'UKS Set Kraków',
  kickoffTime: null,
};

describe('NextMatchSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-14T16:54:56+02:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders match details, live countdown and form', () => {
    render(
      <MemoryRouter>
        <NextMatchSection form={['W', 'P', '-']} match={match} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'MKS Set Nowa Wieś' })).toBeInTheDocument();
    expect(screen.getByText('I liga mężczyzn · Kolejka 1')).toBeInTheDocument();
    expect(screen.getByText(/15 sierpnia 2026, 19:00/)).toBeInTheDocument();
    expect(screen.getByText(/Wyjazd/)).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('ticks the countdown down every second', () => {
    render(
      <MemoryRouter>
        <NextMatchSection form={[]} match={match} />
      </MemoryRouter>,
    );

    expect(screen.getByText('04')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('shows the exact venue address when known, instead of the home/away label', () => {
    const matchWithVenue: UpcomingMatch = { ...match, venue: 'Miechów, ul. Konopnickiej 2' };

    render(
      <MemoryRouter>
        <NextMatchSection form={[]} match={matchWithVenue} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Miechów, ul\. Konopnickiej 2/)).toBeInTheDocument();
    expect(screen.queryByText(/Wyjazd/)).not.toBeInTheDocument();
  });

  it('shows just the competition name, with no round, for a friendly with no league round', () => {
    const friendly: UpcomingMatch = { ...match, round: undefined, competition: 'Sparing' };

    render(
      <MemoryRouter>
        <NextMatchSection form={[]} match={friendly} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Sparing')).toBeInTheDocument();
    expect(screen.queryByText(/Kolejka/)).not.toBeInTheDocument();
  });

  it('shows a pending message instead of a countdown when the kickoff time is not yet known', () => {
    render(
      <MemoryRouter>
        <NextMatchSection form={[]} match={matchWithoutKickoffTime} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'UKS Set Kraków' })).toBeInTheDocument();
    expect(screen.getByText(/15 sierpnia 2026, godzina TBD/)).toBeInTheDocument();
    expect(
      screen.getByText('Godzina meczu zostanie ogłoszona wkrótce.'),
    ).toBeInTheDocument();
  });
});
