import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UpcomingMatch } from '../types/domain';
import { useSeasonSchedule } from './useSeasonSchedule';

afterEach(cleanup);

function buildMatch(overrides: Partial<UpcomingMatch>): UpcomingMatch {
  return {
    round: 1,
    opponent: 'Przeciwnik',
    competition: 'II liga małopolska mężczyzn',
    location: 'home',
    matchDate: '2026-11-07',
    kickoffTime: null,
    ...overrides,
  };
}

describe('useSeasonSchedule', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('advances the hero match on its own once the known kickoff time passes, with no external re-render', () => {
    vi.setSystemTime(new Date('2026-11-07T17:59:00+01:00'));
    const matches = [
      buildMatch({ opponent: 'Round 1', matchDate: '2026-11-07', kickoffTime: '18:00' }),
      buildMatch({ opponent: 'Round 2', matchDate: '2026-11-14' }),
    ];

    const { result } = renderHook(() => useSeasonSchedule(matches));

    expect(result.current[0]?.opponent).toBe('Round 1');

    act(() => {
      vi.advanceTimersByTime(2 * 60 * 1000);
    });

    expect(result.current[0]?.opponent).toBe('Round 2');
  });

  it('drops a TBD match at the following Warsaw midnight, with no external re-render', () => {
    vi.setSystemTime(new Date('2026-11-07T23:59:30+01:00'));
    const matches = [
      buildMatch({ opponent: 'Today, TBD', matchDate: '2026-11-07' }),
      buildMatch({ opponent: 'Next week', matchDate: '2026-11-14' }),
    ];

    const { result } = renderHook(() => useSeasonSchedule(matches));

    expect(result.current[0]?.opponent).toBe('Today, TBD');

    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });

    expect(result.current[0]?.opponent).toBe('Next week');
  });

  it('does not schedule a timer once the season has no fixtures left', () => {
    vi.setSystemTime(new Date('2026-11-07T18:00:01+01:00'));
    const setTimeoutSpy = vi.spyOn(window, 'setTimeout');
    const matches = [buildMatch({ matchDate: '2026-11-07', kickoffTime: '18:00' })];

    const { result } = renderHook(() => useSeasonSchedule(matches));

    expect(result.current).toEqual([]);
    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });

  it('clamps the scheduled delay instead of overflowing setTimeout for a far-future kickoff', () => {
    vi.setSystemTime(new Date('2026-11-07T10:00:00+01:00'));
    const setTimeoutSpy = vi.spyOn(window, 'setTimeout');
    const matches = [buildMatch({ matchDate: '2999-01-01', kickoffTime: '18:00' })];

    renderHook(() => useSeasonSchedule(matches));

    const delay = setTimeoutSpy.mock.calls[0]?.[1];
    expect(delay).toBeLessThanOrEqual(24 * 60 * 60 * 1000);
    expect(delay).toBeLessThan(2 ** 31 - 1);
  });

  it('clears the pending timer on unmount', () => {
    vi.setSystemTime(new Date('2026-11-07T17:59:00+01:00'));
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const matches = [buildMatch({ matchDate: '2026-11-07', kickoffTime: '18:00' })];

    const { unmount } = renderHook(() => useSeasonSchedule(matches));
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
