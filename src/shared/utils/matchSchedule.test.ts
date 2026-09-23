import { describe, expect, it } from 'vitest';
import type { UpcomingMatch } from '../types/domain';
import {
  formatKickoffLabel,
  getNextMatch,
  getRemainingMatches,
  getScheduleCutoff,
  getSeasonSchedule,
  toKickoffIso,
} from './matchSchedule';

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

  it('never lets the hero match (getNextMatch) and the list (getRemainingMatches) disagree once a fixture has passed', () => {
    const matches = [
      buildMatch({ opponent: 'Round 1', matchDate: '2026-11-07' }),
      buildMatch({ opponent: 'Round 2', matchDate: '2026-11-14' }),
      buildMatch({ opponent: 'Round 3', matchDate: '2026-11-21' }),
    ];
    const dayAfterRoundOne = new Date('2026-11-08T12:00:00+01:00');

    const nextMatch = getNextMatch(matches, dayAfterRoundOne);
    const remaining = getRemainingMatches(matches, dayAfterRoundOne);

    expect(nextMatch?.opponent).toBe('Round 2');
    expect(remaining.map((match) => match.opponent)).toEqual(['Round 3']);
    expect(remaining.some((match) => match.opponent === nextMatch?.opponent)).toBe(false);
  });
});

describe('getSeasonSchedule', () => {
  it('sorts and filters matches without dropping the first one', () => {
    const now = new Date('2026-11-10T12:00:00+01:00');
    const matches = [
      buildMatch({ opponent: 'B', matchDate: '2026-11-21' }),
      buildMatch({ opponent: 'A', matchDate: '2026-11-14' }),
    ];

    expect(getSeasonSchedule(matches, now).map((match) => match.opponent)).toEqual(['A', 'B']);
  });

  it('excludes a same-day match once its known kickoff time has passed', () => {
    const matches = [
      buildMatch({ opponent: 'Already started', matchDate: '2026-11-07', kickoffTime: '18:00' }),
      buildMatch({ opponent: 'Next week', matchDate: '2026-11-14' }),
    ];
    const justAfterKickoff = new Date('2026-11-07T18:05:00+01:00');

    expect(getSeasonSchedule(matches, justAfterKickoff).map((match) => match.opponent)).toEqual([
      'Next week',
    ]);
  });

  it('keeps a same-day match upcoming right until its known kickoff time', () => {
    const matches = [
      buildMatch({ opponent: 'Later today', matchDate: '2026-11-07', kickoffTime: '18:00' }),
    ];
    const justBeforeKickoff = new Date('2026-11-07T17:59:59+01:00');

    expect(getSeasonSchedule(matches, justBeforeKickoff).map((match) => match.opponent)).toEqual([
      'Later today',
    ]);
  });

  it('keeps a same-day TBD match upcoming for the whole day, since no exact time is known', () => {
    const matches = [buildMatch({ opponent: 'TBD today', matchDate: '2026-11-07', kickoffTime: null })];
    const lateInTheDay = new Date('2026-11-07T23:59:00+01:00');

    expect(getSeasonSchedule(matches, lateInTheDay).map((match) => match.opponent)).toEqual([
      'TBD today',
    ]);
  });
});

describe('getNextMatch', () => {
  const now = new Date('2026-11-10T12:00:00+01:00');

  it('returns the earliest upcoming match', () => {
    const matches = [
      buildMatch({ opponent: 'B', matchDate: '2026-11-21' }),
      buildMatch({ opponent: 'A', matchDate: '2026-11-14' }),
    ];

    expect(getNextMatch(matches, now)?.opponent).toBe('A');
  });

  it('returns null once the season has no fixtures left', () => {
    const matches = [buildMatch({ opponent: 'Past', matchDate: '2026-10-01' })];

    expect(getNextMatch(matches, now)).toBeNull();
  });
});

describe('toKickoffIso', () => {
  it('uses the +01:00 winter offset outside daylight saving time', () => {
    const match = buildMatch({ matchDate: '2026-11-07', kickoffTime: '18:00' });

    expect(toKickoffIso(match)).toBe('2026-11-07T18:00:00+01:00');
  });

  it('uses the +02:00 summer offset during Polish daylight saving time', () => {
    const match = buildMatch({ matchDate: '2026-08-15', kickoffTime: '19:00' });

    expect(toKickoffIso(match)).toBe('2026-08-15T19:00:00+02:00');
  });

  it('returns null when the kickoff time is TBD', () => {
    const match = buildMatch({ kickoffTime: null });

    expect(toKickoffIso(match)).toBeNull();
  });
});

describe('getScheduleCutoff', () => {
  it('returns the kickoff instant when the next match has a known time', () => {
    const now = new Date('2026-11-07T10:00:00+01:00');
    const schedule = [buildMatch({ matchDate: '2026-11-07', kickoffTime: '18:00' })];

    expect(getScheduleCutoff(schedule, now)).toBe(new Date('2026-11-07T18:00:00+01:00').getTime());
  });

  it('returns the next local midnight when the next match time is TBD', () => {
    const now = new Date('2026-11-07T10:30:00+01:00');
    const schedule = [buildMatch({ matchDate: '2026-11-07', kickoffTime: null })];

    expect(getScheduleCutoff(schedule, now)).toBe(new Date('2026-11-08T00:00:00+01:00').getTime());
  });

  it('resolves the actual local midnight across the Warsaw spring DST change', () => {
    const now = new Date('2027-03-28T00:30:00+01:00');
    const schedule = [buildMatch({ matchDate: '2027-03-28', kickoffTime: null })];

    expect(getScheduleCutoff(schedule, now)).toBe(new Date('2027-03-29T00:00:00+02:00').getTime());
  });

  it('returns null when the schedule is empty', () => {
    expect(getScheduleCutoff([], new Date('2026-11-07T10:00:00+01:00'))).toBeNull();
  });
});

describe('formatKickoffLabel', () => {
  it('includes the time when it is known', () => {
    const match = buildMatch({ matchDate: '2026-11-07', kickoffTime: '18:00' });

    expect(formatKickoffLabel(match)).toBe('7 listopada 2026, 18:00');
  });

  it('falls back to a TBD marker when the time is unknown', () => {
    const match = buildMatch({ matchDate: '2026-11-07', kickoffTime: null });

    expect(formatKickoffLabel(match)).toBe('7 listopada 2026, godzina TBD');
  });
});
