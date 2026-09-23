import { describe, expect, it } from 'vitest';
import type { UpcomingMatch } from '../types/domain';
import { getRemainingMatches } from './matchSchedule';

function buildMatch(overrides: Partial<UpcomingMatch>): UpcomingMatch {
  return {
    round: 1,
    opponent: 'Przeciwnik',
    competition: 'II liga małopolska mężczyzn',
    location: 'home',
    matchDate: '2026-11-14',
    kickoffTime: null,
    ...overrides,
  };
}

describe('getRemainingMatches', () => {
  const now = new Date('2026-11-10T12:00:00+01:00');

  it('drops the earliest upcoming match and sorts the rest chronologically', () => {
    const matches = [
      buildMatch({ opponent: 'C', matchDate: '2026-12-05' }),
      buildMatch({ opponent: 'A', matchDate: '2026-11-14' }),
      buildMatch({ opponent: 'B', matchDate: '2026-11-21' }),
    ];

    const result = getRemainingMatches(matches, now);

    expect(result.map((match) => match.opponent)).toEqual(['B', 'C']);
  });

  it('excludes matches whose date has already passed', () => {
    const matches = [
      buildMatch({ opponent: 'Past', matchDate: '2026-10-01' }),
      buildMatch({ opponent: 'Next', matchDate: '2026-11-14' }),
      buildMatch({ opponent: 'Later', matchDate: '2026-11-21' }),
    ];

    const result = getRemainingMatches(matches, now);

    expect(result.map((match) => match.opponent)).toEqual(['Later']);
  });

  it('still counts a match happening today as upcoming', () => {
    const matches = [
      buildMatch({ opponent: 'Today', matchDate: '2026-11-10' }),
      buildMatch({ opponent: 'Next week', matchDate: '2026-11-17' }),
    ];

    const result = getRemainingMatches(matches, now);

    expect(result.map((match) => match.opponent)).toEqual(['Next week']);
  });

  it('returns an empty array once fewer than two matches remain', () => {
    const matches = [buildMatch({ opponent: 'Last one', matchDate: '2026-11-14' })];

    expect(getRemainingMatches(matches, now)).toEqual([]);
  });

  it('returns an empty array for an empty input', () => {
    expect(getRemainingMatches([], now)).toEqual([]);
  });

  it('does not mutate the source array', () => {
    const matches = [
      buildMatch({ opponent: 'B', matchDate: '2026-11-21' }),
      buildMatch({ opponent: 'A', matchDate: '2026-11-14' }),
    ];
    const copy = [...matches];

    getRemainingMatches(matches, now);

    expect(matches).toEqual(copy);
  });
});
