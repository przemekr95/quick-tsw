import type { MatchLocation, UpcomingMatch } from '../types/domain';

export const MATCH_LOCATION_LABEL: Record<MatchLocation, string> = {
  home: 'U siebie',
  away: 'Wyjazd',
};

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Mecze sezonu, które jeszcze się nie odbyły, posortowane chronologicznie.
 * Jedyne źródło prawdy zarówno dla najbliższego meczu (odliczanie), jak
 * i listy kolejnych meczów — dzięki temu obie sekcje nie mogą się rozjechać.
 */
export function getSeasonSchedule(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  const today = toLocalDateString(now);

  return [...matches]
    .filter((match) => match.matchDate >= today)
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate));
}

/** Najbliższy nadchodzący mecz, albo `null`, gdy sezon się zakończył. */
export function getNextMatch(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch | null {
  return getSeasonSchedule(matches, now)[0] ?? null;
}

/**
 * Mecze następujące po najbliższym (ten jest już pokazany w odliczaniu).
 * Długość wyniku naturalnie maleje w miarę upływu sezonu.
 */
export function getRemainingMatches(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  return getSeasonSchedule(matches, now).slice(1);
}

/** Data i godzina meczu w formacie ISO, lub `null`, gdy godzina nie została jeszcze ustalona (TBD). */
export function toKickoffIso(match: UpcomingMatch): string | null {
  return match.kickoffTime ? `${match.matchDate}T${match.kickoffTime}:00+01:00` : null;
}

const MONTH_FORMATTER = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Czytelna etykieta terminu meczu, np. "7 listopada 2026, 18:00" lub "7 listopada 2026, godzina TBD". */
export function formatKickoffLabel(match: UpcomingMatch): string {
  const [year, month, day] = match.matchDate.split('-').map(Number);
  const dateLabel = MONTH_FORMATTER.format(new Date(year, month - 1, day));

  return match.kickoffTime ? `${dateLabel}, ${match.kickoffTime}` : `${dateLabel}, godzina TBD`;
}
