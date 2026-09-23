import { useEffect, useState } from 'react';
import type { ClubMatchCountdownItem } from '../types/domain';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

function getRemainingMs(kickoffAt: string): number {
  const kickoffMs = new Date(kickoffAt).getTime();

  if (Number.isNaN(kickoffMs)) return 0;

  return Math.max(0, kickoffMs - Date.now());
}

function toCountdownItems(remainingMs: number): ClubMatchCountdownItem[] {
  const days = Math.floor(remainingMs / MS_PER_DAY);
  const hours = Math.floor((remainingMs % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((remainingMs % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / MS_PER_SECOND);

  return [
    { value: pad(days), label: 'Dni' },
    { value: pad(hours), label: 'Godz' },
    { value: pad(minutes), label: 'Min' },
    { value: pad(seconds), label: 'Sek' },
  ];
}

export function useMatchCountdown(kickoffAt: string | null): ClubMatchCountdownItem[] | null {
  const [countdown, setCountdown] = useState<ClubMatchCountdownItem[] | null>(() =>
    kickoffAt ? toCountdownItems(getRemainingMs(kickoffAt)) : null,
  );

  useEffect(() => {
    if (!kickoffAt) {
      setCountdown(null);
      return;
    }

    const tick = (): number => {
      const remainingMs = getRemainingMs(kickoffAt);
      setCountdown(toCountdownItems(remainingMs));
      return remainingMs;
    };

    if (tick() <= 0) return;

    const timer = window.setInterval(() => {
      if (tick() <= 0) {
        window.clearInterval(timer);
      }
    }, MS_PER_SECOND);

    return () => {
      window.clearInterval(timer);
    };
  }, [kickoffAt]);

  return countdown;
}
