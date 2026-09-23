import { useEffect, useState } from 'react';
import type { ClubMatchCountdownItem } from '../types/domain';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

function buildCountdown(kickoffAt: string): ClubMatchCountdownItem[] {
  const remainingMs = Math.max(0, new Date(kickoffAt).getTime() - Date.now());

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

export function useMatchCountdown(kickoffAt: string): ClubMatchCountdownItem[] {
  const [countdown, setCountdown] = useState(() => buildCountdown(kickoffAt));

  useEffect(() => {
    setCountdown(buildCountdown(kickoffAt));

    const timer = window.setInterval(() => {
      setCountdown(buildCountdown(kickoffAt));
    }, MS_PER_SECOND);

    return () => {
      window.clearInterval(timer);
    };
  }, [kickoffAt]);

  return countdown;
}
