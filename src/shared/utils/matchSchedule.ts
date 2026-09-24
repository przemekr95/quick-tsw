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

function toWarsawDateString(instant: Date): string {
  const { year, month, day } = getWarsawWallClock(instant);

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getWarsawOffsetMinutes(instant: Date): number {
  const { year, month, day, hour, minute, second } = getWarsawWallClock(instant);
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute, second);

  return Math.round((asIfUtc - instant.getTime()) / 60_000);
}

const WARSAW_WINTER_OFFSET_MINUTES = getWarsawOffsetMinutes(new Date(Date.UTC(2020, 0, 15)));
const WARSAW_SUMMER_OFFSET_MINUTES = getWarsawOffsetMinutes(new Date(Date.UTC(2020, 6, 15)));

function resolveWarsawOffsetMinutes(naiveUtcMs: number): number {
  const candidates = [WARSAW_WINTER_OFFSET_MINUTES, WARSAW_SUMMER_OFFSET_MINUTES];
  const isSelfConsistent = (offset: number): boolean =>
    getWarsawOffsetMinutes(new Date(naiveUtcMs - offset * 60_000)) === offset;
  const resolvable = [...new Set(candidates)].filter(isSelfConsistent);

  if (resolvable.length === 1) return resolvable[0];

  return Math.max(...candidates);
}

interface ResolvedWarsawInstant {
  instantMs: number;
  offsetMinutes: number;
}

function resolveWarsawWallClock(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): ResolvedWarsawInstant {
  const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offsetMinutes = resolveWarsawOffsetMinutes(naiveUtcMs);

  return { instantMs: naiveUtcMs - offsetMinutes * 60_000, offsetMinutes };
}

function getNextWarsawMidnight(now: Date): Date {
  const { year, month, day } = getWarsawWallClock(now);

  return new Date(resolveWarsawWallClock(year, month, day + 1, 0, 0).instantMs);
}

function formatOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, '0');
  const minutes = String(abs % 60).padStart(2, '0');

  return `${sign}${hours}:${minutes}`;
}

export function toKickoffIso(match: UpcomingMatch): string | null {
  if (!match.kickoffTime) return null;

  const [year, month, day] = match.matchDate.split('-').map(Number);
  const [hour, minute] = match.kickoffTime.split(':').map(Number);
  const { offsetMinutes } = resolveWarsawWallClock(year, month, day, hour, minute);

  return `${match.matchDate}T${match.kickoffTime}:00${formatOffset(offsetMinutes)}`;
}

function hasKickedOff(match: UpcomingMatch, now: Date): boolean {
  const kickoffIso = toKickoffIso(match);

  if (kickoffIso) {
    return new Date(kickoffIso).getTime() <= now.getTime();
  }

  return match.matchDate < toWarsawDateString(now);
}

export function getSeasonSchedule(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  return [...matches]
    .filter((match) => !hasKickedOff(match, now))
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate));
}

export function getNextMatch(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch | null {
  return getSeasonSchedule(matches, now)[0] ?? null;
}

export function getRemainingMatches(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  return getSeasonSchedule(matches, now).slice(1);
}

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

export function formatKickoffLabel(match: UpcomingMatch): string {
  const [year, month, day] = match.matchDate.split('-').map(Number);
  const dateLabel = MONTH_FORMATTER.format(new Date(year, month - 1, day));

  return match.kickoffTime ? `${dateLabel}, ${match.kickoffTime}` : `${dateLabel}, godzina TBD`;
}
