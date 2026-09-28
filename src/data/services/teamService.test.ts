import { describe, expect, it } from 'vitest';
import type { PlayerPosition } from '../../shared/types/domain';
import { getTeamData } from './teamService';

const knownPositions: PlayerPosition[] = [
  'Rozgrywający',
  'Atakujący',
  'Przyjmujący',
  'Środkowy',
  'Libero',
];

describe('teamService', () => {
  it('returns roster data for mezczyzni', async () => {
    const data = await getTeamData('mezczyzni');

    expect(data.length).toBeGreaterThan(0);
  });

  it('assigns every player one of the known positions', async () => {
    const data = await getTeamData('mezczyzni');

    for (const player of data) {
      expect(knownPositions).toContain(player.position);
    }
  });
});
