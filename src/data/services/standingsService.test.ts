import { describe, expect, it } from 'vitest';
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

describe('standingsService', () => {
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
