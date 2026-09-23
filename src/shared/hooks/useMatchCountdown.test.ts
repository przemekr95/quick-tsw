import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMatchCountdown } from './useMatchCountdown';

afterEach(cleanup);

const kickoffAt = '2026-08-15T19:00:00+02:00';

describe('useMatchCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the remaining time split into days, hours, minutes and seconds', () => {
    vi.setSystemTime(new Date('2026-08-14T16:54:56+02:00'));

    const { result } = renderHook(() => useMatchCountdown(kickoffAt));

    expect(result.current).toEqual([
      { value: '01', label: 'Dni' },
      { value: '02', label: 'Godz' },
      { value: '05', label: 'Min' },
      { value: '04', label: 'Sek' },
    ]);
  });

  it('ticks down every second', () => {
    vi.setSystemTime(new Date('2026-08-14T16:54:56+02:00'));

    const { result } = renderHook(() => useMatchCountdown(kickoffAt));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.find((item) => item.label === 'Sek')?.value).toBe('03');
  });

  it('clamps to zero once the kickoff has passed', () => {
    vi.setSystemTime(new Date('2026-08-16T00:00:00+02:00'));

    const { result } = renderHook(() => useMatchCountdown(kickoffAt));

    expect(result.current).toEqual([
      { value: '00', label: 'Dni' },
      { value: '00', label: 'Godz' },
      { value: '00', label: 'Min' },
      { value: '00', label: 'Sek' },
    ]);
  });

  it('does not start a timer when the kickoff is already in the past', () => {
    vi.setSystemTime(new Date('2026-08-16T00:00:00+02:00'));
    const setIntervalSpy = vi.spyOn(window, 'setInterval');

    renderHook(() => useMatchCountdown(kickoffAt));

    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it('stops ticking once the countdown reaches zero', () => {
    vi.setSystemTime(new Date('2026-08-15T18:59:58+02:00'));

    const { result } = renderHook(() => useMatchCountdown(kickoffAt));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.every((item) => item.value === '00')).toBe(true);
    expect(vi.getTimerCount()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.every((item) => item.value === '00')).toBe(true);
  });
});
