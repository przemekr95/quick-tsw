import { useEffect, useMemo, useState } from 'react';
import type { UpcomingMatch } from '../types/domain';
import { getScheduleCutoff, getSeasonSchedule } from '../utils/matchSchedule';

// setTimeout takes a 32-bit signed int (~24.8 days); anything larger silently
// overflows and the browser fires it almost immediately. Cap the delay well
// under that limit and simply re-check later for a cutoff that's further out
// — the effect re-runs and reschedules on its own each time `now` advances.
const MAX_TIMEOUT_MS = 24 * 60 * 60 * 1000;

/**
 * Harmonogram sezonu, który sam się przelicza dokładnie w momencie, w którym
 * mógłby się zmienić (kickoff najbliższego meczu albo północ dla meczu z
 * nieznaną godziną) — zamiast zamrażać się na starym stanie do czasu
 * kolejnego, niepowiązanego re-renderu (np. nawigacji).
 */
export function useSeasonSchedule(matches: UpcomingMatch[]): UpcomingMatch[] {
  const [now, setNow] = useState(() => new Date());

  const schedule = useMemo(() => getSeasonSchedule(matches, now), [matches, now]);

  useEffect(() => {
    const cutoff = getScheduleCutoff(schedule, now);
    if (cutoff === null) return;

    const delay = Math.min(Math.max(0, cutoff - Date.now()), MAX_TIMEOUT_MS);
    const timer = window.setTimeout(() => setNow(new Date()), delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [schedule, now]);

  return schedule;
}
