import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ClubNextMatch } from '../../../shared/types/domain';
import { NextMatchSection } from './NextMatchSection';

afterEach(cleanup);

const match: ClubNextMatch = {
  opponent: 'MKS Set Nowa Wieś',
  competition: 'I liga mężczyzn',
  kickoffLabel: '15 sierpnia 2026, 19:00',
  kickoffAt: '2026-08-15T19:00:00+02:00',
  venue: 'Hala Sportowa, ul. Sportowa 1',
};

describe('NextMatchSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Dokładnie 1 dzień, 2 godziny, 5 minut i 4 sekundy przed kickoffem.
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
    expect(screen.getByText(/15 sierpnia 2026, 19:00/)).toBeInTheDocument();
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
});
