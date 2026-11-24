import type { MatchFormResult, StandingsRow } from '../types/domain';

/**
 * Forma naszej drużyny z tabeli (wpisywana w panelu admina, od najstarszego meczu).
 * Gdy tabela się nie wczytała albo nasz wiersz nie ma formy, zostaje `fallback`.
 */
export function ownTeamForm(
  standings: StandingsRow[] | null,
  fallback: MatchFormResult[],
): MatchFormResult[] {
  const form = standings?.find((row) => row.isOwnTeam)?.form;

  return form && form.length > 0 ? form : fallback;
}
