import { describe, expect, it } from 'vitest';
import type { MatchFormResult, StandingsRow } from '../types/domain';
import { ownTeamForm } from './standings';

const fallback: MatchFormResult[] = ['-', '-', '-', '-', '-'];

function row(team: string, extra: Partial<StandingsRow> = {}): StandingsRow {
  return {
    position: 1,
    team,
    played: 0,
    points: 0,
    setsWon: 0,
    setsLost: 0,
    smallPointsWon: 0,
    smallPointsLost: 0,
    ...extra,
  };
}

describe('ownTeamForm', () => {
  it('takes the form of our team from the standings', () => {
    const standings = [
      row('Rywal', { form: ['P', 'P'] }),
      row('TS WISŁA Kraków', { isOwnTeam: true, form: ['W', 'P', 'W', '-', '-'] }),
    ];

    expect(ownTeamForm(standings, fallback)).toEqual(['W', 'P', 'W', '-', '-']);
  });

  it('falls back when the standings failed to load or our team has no form', () => {
    expect(ownTeamForm(null, fallback)).toBe(fallback);
    expect(ownTeamForm([row('TS WISŁA Kraków', { isOwnTeam: true })], fallback)).toBe(fallback);
    expect(ownTeamForm([row('TS WISŁA Kraków', { isOwnTeam: true, form: [] })], fallback)).toBe(
      fallback,
    );
    expect(ownTeamForm([row('Rywal', { form: ['W'] })], fallback)).toBe(fallback);
  });
});
