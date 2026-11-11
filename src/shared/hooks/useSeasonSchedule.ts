import { useEffect, useMemo, useState } from 'react';
import type { UpcomingMatch } from '../types/domain';
import { getScheduleCutoff, getSeasonSchedule } from '../utils/matchSchedule';

const MAX_TIMEOUT_MS = 24 * 60 * 60 * 1000;
const NO_MATCHES: UpcomingMatch[] = [];

// `null` (matches that failed to load) gives an empty schedule.
export function useSeasonSchedule(matches: UpcomingMatch[] | null): UpcomingMatch[] {
  const [now, setNow] = useState(() => new Date());

  const schedule = useMemo(() => getSeasonSchedule(matches ?? NO_MATCHES, now), [matches, now]);

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
