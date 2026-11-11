import { describe, expect, it, vi } from 'vitest';
import type { StandingsRow } from '../../shared/types/domain';
import { getStandings } from './standingsService';

const EXPECTED_TEAMS_IN_ORDER = [
  'MUKS ISKIERKA Tarnów',
  'PROJEKT Myślenice',
  'FOTONLAB GRYF Miechów',
  'KS HUTNIK Kraków',
  'MUKS SOKÓŁ Gumniska Tarnów',
  'TS WISŁA Kraków',
  'HUTNIK Kraków',
  'KS DALIN Myślenice',
];

function standingsRow(position: number, team: string): StandingsRow {
  return {
    position,
    team,
    played: 0,
    wins: 0,
    losses: 0,
    setsWon: 0,
    setsLost: 0,
    points: 0,
  };
}

describe('standingsService', () => {
  it('orders the rows by league position, whatever order the API sends them in', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [
        standingsRow(3, 'FOTONLAB GRYF Miechów'),
        standingsRow(1, 'MUKS ISKIERKA Tarnów'),
        standingsRow(2, 'PROJEKT Myślenice'),
      ],
    } as Response);

    const data = await getStandings('mezczyzni');

    expect(data.map((row) => row.position)).toEqual([1, 2, 3]);
    expect(data.map((row) => row.team)).toEqual([
      'MUKS ISKIERKA Tarnów',
      'PROJEKT Myślenice',
      'FOTONLAB GRYF Miechów',
    ]);
  });

  it('returns all 8 league teams, in the official pre-season order, positions 1-8', async () => {
    const data = await getStandings('mezczyzni');

    expect(data.map((row) => row.team)).toEqual(EXPECTED_TEAMS_IN_ORDER);
    expect(data.map((row) => row.position)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('starts every team at zero played/wins/losses/sets/points before the season begins', async () => {
    const data = await getStandings('mezczyzni');

    data.forEach((row) => {
      expect(row.played).toBe(0);
      expect(row.wins).toBe(0);
      expect(row.losses).toBe(0);
      expect(row.setsWon).toBe(0);
      expect(row.setsLost).toBe(0);
      expect(row.points).toBe(0);
    });
  });

  it('marks TS WISŁA Kraków, and only TS WISŁA Kraków, as the own team', async () => {
    const data = await getStandings('mezczyzni');

    const ownTeams = data.filter((row) => row.isOwnTeam);
    expect(ownTeams).toHaveLength(1);
    expect(ownTeams[0]?.team).toBe('TS WISŁA Kraków');
  });
});
