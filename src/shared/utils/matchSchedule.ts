import type { UpcomingMatch } from '../types/domain';

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Zwraca mecze sezonu następujące po najbliższym (już pokazanym w odliczaniu),
 * posortowane chronologicznie i ograniczone do tych, które jeszcze się nie odbyły.
 * Długość wyniku naturalnie maleje w miarę upływu sezonu.
 */
export function getRemainingMatches(matches: UpcomingMatch[], now: Date = new Date()): UpcomingMatch[] {
  const today = toLocalDateString(now);

  return [...matches]
    .filter((match) => match.matchDate >= today)
    .sort((a, b) => a.matchDate.localeCompare(b.matchDate))
    .slice(1);
}
