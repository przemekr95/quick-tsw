import { useEffect, useState } from 'react';
import type { HeroSlide } from '../types/domain';

interface UseHeroSliderResult {
  activeIndex: number;
  slideKey: string;
  goTo: (index: number) => void;
}

export const HERO_SLIDE_DURATION_MS = 6000;

export function useHeroSlider(slides: HeroSlide[]): UseHeroSliderResult {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    setTimerKey(0);
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setTimerKey((k) => k + 1);
    }, HERO_SLIDE_DURATION_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length, timerKey]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setTimerKey((k) => k + 1);
  };

  return { activeIndex, slideKey: `${activeIndex}-${timerKey}`, goTo };
}
