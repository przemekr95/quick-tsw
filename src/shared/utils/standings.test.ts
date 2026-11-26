import { describe, expect, it } from 'vitest';
import type { MatchFormResult, StandingsRow } from '../types/domain';
import { opponentForm } from './standings';

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

describe('opponentForm', () => {
  const standings = [
    row('TS WISŁA Kraków', { isOwnTeam: true, form: ['W', 'W', 'W'] }),
    row('HUTNIK Kraków', { form: ['W', 'P'] }),
    row('KS HUTNIK Kraków II', { form: ['P', 'P'] }),
    row('KS DALIN Myślenice', { form: ['W', 'W', 'P', '-', '-'] }),
  ];

  it('takes the form of the opponent from the standings', () => {
    expect(opponentForm(standings, 'KS DALIN Myślenice', fallback)).toEqual([
      'W',
      'W',
      'P',
      '-',
      '-',
    ]);
    expect(opponentForm(standings, '  ks dalin   myślenice ', fallback)).toEqual([
      'W',
      'W',
      'P',
      '-',
      '-',
    ]);
  });

  it('prefers the exact name and accepts a reserve-team suffix in the standings', () => {
    expect(opponentForm(standings, 'HUTNIK Kraków', fallback)).toEqual(['W', 'P']);
    expect(opponentForm(standings, 'KS HUTNIK Kraków', fallback)).toEqual(['P', 'P']);
  });

  it('never shows our own form', () => {
    expect(opponentForm(standings, 'TS WISŁA Kraków', fallback)).toBe(fallback);
  });

  it('falls back when the standings failed, the opponent is missing or has no form', () => {
    expect(opponentForm(null, 'KS DALIN Myślenice', fallback)).toBe(fallback);
    expect(opponentForm(standings, 'MKS Gryf Brzesko', fallback)).toBe(fallback);
    expect(opponentForm([row('KS DALIN Myślenice')], 'KS DALIN Myślenice', fallback)).toBe(
      fallback,
    );
    expect(
      opponentForm([row('KS DALIN Myślenice', { form: [] })], 'KS DALIN Myślenice', fallback),
    ).toBe(fallback);
  });

  it('falls back when the name prefix is ambiguous', () => {
    const ambiguous = [row('AZS Kraków I', { form: ['W'] }), row('AZS Kraków II', { form: ['P'] })];

    expect(opponentForm(ambiguous, 'AZS Kraków', fallback)).toBe(fallback);
  });
});
