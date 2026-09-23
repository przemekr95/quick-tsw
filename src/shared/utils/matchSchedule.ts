import type { MatchLocation, UpcomingMatch } from '../types/domain';

const WARSAW_TIME_ZONE = 'Europe/Warsaw';

export const MATCH_LOCATION_LABEL: Record<MatchLocation, string> = {
  home: 'U siebie',
  away: 'Wyjazd',
};

interface WarsawWallClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const WARSAW_WALL_CLOCK_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: WARSAW_TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Rozkłada moment na jego składowe w czasie ściennym Europe/Warsaw, niezależnie od strefy hosta. */
function getWarsawWallClock(instant: Date): WarsawWallClock {
  const parts = WARSAW_WALL_CLOCK_FORMATTER.formatToParts(instant);
  const get = (type: string): number => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

/** Dzisiejsza data (YYYY-MM-DD) w kalendarzu Europe/Warsaw, niezależnie od strefy hosta. */
function toWarsawDateString(instant: Date): string {
  const { year, month, day } = getWarsawWallClock(instant);

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Przesunięcie strefy czasowej Europe/Warsaw (w minutach) obowiązujące w danym
 * momencie — uwzględnia czas letni (CEST, +02:00) i zimowy (CET, +01:00).
 */
function getWarsawOffsetMinutes(instant: Date): number {
  const { year, month, day, hour, minute, second } = getWarsawWallClock(instant);
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute, second);

  return Math.round((asIfUtc - instant.getTime()) / 60_000);
}

/** Początek następnego dnia kalendarzowego Europe/Warsaw, jako moment absolutny. */
function getNextWarsawMidnight(now: Date): Date {
  const { year, month, day } = getWarsawWallClock(now);
  const naiveNextMidnightUtc = Date.UTC(year, month - 1, day + 1, 0, 0, 0);

  // Przybliżenie: przesunięcie strefy liczone dla `now`, nie dla samej
  // północy — niedokładne tylko w noc zmiany czasu w Warszawie, i tylko o
  // godzinę, a harmonogram i tak przeliczy się ponownie przy najbliższej okazji.
  return new Date(naiveNextMidnightUtc - getWarsawOffsetMinutes(now) * 60_000);
}

function formatOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, '0');
  const minutes = String(abs % 60).padStart(2, '0');

  return `${sign}${hours}:${minutes}`;
}

/**
 * Data i godzina meczu w formacie ISO (z poprawnym przesunięciem dla
 * Europe/Warsaw, także w czasie letnim), lub `null`, gdy godzina nie została
 * jeszcze ustalona (TBD).
 */
export function toKickoffIso(match: UpcomingMatch): string | null {
  if (!match.kickoffTime) return null;

  // Kotwica tylko do wyznaczenia przesunięcia strefy w tym dniu — sama data
  // kalendarzowa nie zależy od strefy, więc niewielka niedokładność co do
  // godziny UTC w tym kroku nie ma znaczenia.
  const anchor = new Date(`${match.matchDate}T${match.kickoffTime}:00Z`);
  const offset = formatOffset(getWarsawOffsetMinutes(anchor));

  return `${match.matchDate}T${match.kickoffTime}:00${offset}`;
}

function hasKickedOff(match: UpcomingMatch, now: Date): boolean {
  const kickoffIso = toKickoffIso(match);

  if (kickoffIso) {
    return new Date(kickoffIso).getTime() <= now.getTime();
  }

  // Godzina nieznana (TBD) — jedyne, co wiemy, to dzień meczu, więc mecz
  // liczy się jako rozegrany dopiero, gdy minie cała jego data.
  return match.matchDate < toWarsawDateString(now);
}

/**
 * Mecze sezonu, które jeszcze się nie odbyły, posortowane chronologicznie.
 * Jedyne źródło prawdy zarówno dla najbliższego meczu (odliczanie), jak
 * i listy kolejnych meczów — dzięki temu obie sekcje nie mogą się rozjechać.
 */
export function getSeasonSchedule(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  return [...matches]
    .filter((match) => !hasKickedOff(match, now))
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

/**
 * Najbliższy moment (w ms epoki), w którym harmonogram może się zmienić —
 * kickoff najbliższego meczu, albo (dla meczu z nieznaną godziną) najbliższa
 * północ w Europe/Warsaw, kiedy jego data przestanie być "dzisiaj lub później".
 * Zwraca `null`, gdy nie ma już żadnych meczów do rozegrania.
 */
export function getScheduleCutoff(schedule: UpcomingMatch[], now: Date): number | null {
  const nextMatch = schedule[0];
  if (!nextMatch) return null;

  const kickoffIso = toKickoffIso(nextMatch);
  if (kickoffIso) {
    return new Date(kickoffIso).getTime();
  }

  return getNextWarsawMidnight(now).getTime();
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
