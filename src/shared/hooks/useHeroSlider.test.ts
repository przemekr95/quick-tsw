import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HeroSlide } from '../types/domain';
import { HERO_SLIDE_DURATION_MS, useHeroSlider } from './useHeroSlider';

afterEach(cleanup);

const slides: HeroSlide[] = [
  { id: 's-1', imageSrc: '/img/1.jpg', imageAlt: 'Slajd 1' },
  { id: 's-2', imageSrc: '/img/2.jpg', imageAlt: 'Slajd 2' },
  { id: 's-3', imageSrc: '/img/3.jpg', imageAlt: 'Slajd 3' },
];

describe('useHeroSlider', () => {
  it('starts at index 0', () => {
    const { result } = renderHook(() => useHeroSlider(slides));
    expect(result.current.activeIndex).toBe(0);
  });

  it('goTo changes activeIndex and increments slideKey', () => {
    const { result } = renderHook(() => useHeroSlider(slides));
    const initialKey = result.current.slideKey;

    act(() => result.current.goTo(2));

    expect(result.current.activeIndex).toBe(2);
    expect(result.current.slideKey).not.toBe(initialKey);
  });

  describe('auto-advance', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('advances to next slide after HERO_SLIDE_DURATION_MS', () => {
      const { result } = renderHook(() => useHeroSlider(slides));

      act(() => {
        vi.advanceTimersByTime(HERO_SLIDE_DURATION_MS);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('wraps around from last slide to first', () => {
      const { result } = renderHook(() => useHeroSlider(slides));

      act(() => {
        vi.advanceTimersByTime(HERO_SLIDE_DURATION_MS * slides.length);
      });

      expect(result.current.activeIndex).toBe(0);
    });
  });
});
