import type { MatchFormResult, StandingsRow } from '../types/domain';

const normalizeTeamName = (name: string): string =>
  name.trim().replace(/\s+/g, ' ').toLocaleLowerCase('pl');

/**
 * Wiersz rywala w tabeli. Nazwy w terminarzu i tabeli pochodzą z MZPS, więc zwykle są
 * identyczne; gdy nie, bierzemy jedyny wiersz, który zaczyna się od nazwy z terminarza
 * (np. „KS HUTNIK Kraków” → „KS HUTNIK Kraków II”).
 */
function findOpponentRow(standings: StandingsRow[], opponent: string): StandingsRow | undefined {
  const name = normalizeTeamName(opponent);
  const rivals = standings.filter((row) => !row.isOwnTeam);
  const exact = rivals.find((row) => normalizeTeamName(row.team) === name);

  if (exact) {
    return exact;
  }

  const prefixed = rivals.filter((row) => normalizeTeamName(row.team).startsWith(`${name} `));

  return prefixed.length === 1 ? prefixed[0] : undefined;
}

/**
 * Forma rywala z tabeli (wpisywana w panelu admina, od najstarszego meczu).
 * Gdy tabela się nie wczytała, rywala nie ma w tabeli albo nie ma wpisanej formy,
 * zostaje `fallback`.
 */
export function opponentForm(
  standings: StandingsRow[] | null,
  opponent: string,
  fallback: MatchFormResult[],
): MatchFormResult[] {
  const form = standings ? findOpponentRow(standings, opponent)?.form : undefined;

  return form && form.length > 0 ? form : fallback;
}
