import { useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import styles from './HeroBackground.module.scss';

interface HeroBackgroundProps extends PropsWithChildren {
  sectionLabel: string;
  sectionPath: '/kobiety' | '/mezczyzni';
}

interface HeroSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
}

const heroSlidesBySection: Record<'kobiety' | 'mezczyzni', HeroSlide[]> = {
  kobiety: [
    {
      id: 'kobiety-1',
      imageSrc: '/images/backgrounds/hero-k.jpg',
      imageAlt: 'Zdjęcie sekcji kobiet podczas akcji meczowej',
    },
    {
      id: 'kobiety-2',
      imageSrc: '/images/backgrounds/hero-m.jpg',
      imageAlt: 'Zdjęcie sekcji kobiet na tle siatki meczowej',
    },
  ],
  mezczyzni: [
    {
      id: 'mezczyzni-1',
      imageSrc: '/images/backgrounds/hero-m.jpg',
      imageAlt: 'Zdjęcie sekcji mężczyzn podczas akcji meczowej',
    },
    {
      id: 'mezczyzni-2',
      imageSrc: '/images/backgrounds/hero-k.jpg',
      imageAlt: 'Zdjęcie sekcji mężczyzn na tle siatki meczowej',
    },
  ],
};

export function HeroBackground({ children, sectionLabel, sectionPath }: HeroBackgroundProps) {
  const sectionId = sectionPath === '/kobiety' ? 'kobiety' : 'mezczyzni';
  const slides = useMemo(() => heroSlidesBySection[sectionId], [sectionId]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [sectionId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section aria-label={`Tło sekcji ${sectionLabel}`} className={styles.hero}>
      <div aria-hidden="true" className={styles.slides}>
        {slides.map((slide, index) => (
          <figure
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ''}`.trim()}
            key={slide.id}
          >
            <img alt={slide.imageAlt} className={styles.slideImage} src={slide.imageSrc} />
          </figure>
        ))}
      </div>

      <div className={styles.sliderUi}>
        <div className={styles.pagination}>
          {slides.map((slide, index) => (
            <button
              aria-label={`Przejdź do slajdu ${index + 1}`}
              className={`${styles.paginationBullet} ${index === activeIndex ? styles.paginationBulletActive : ''}`.trim()}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
          <p className={styles.paginationCounter}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
        </div>

        <div className={styles.controls}>
          <button aria-label="Poprzedni slajd" className={styles.controlButton} onClick={goToPreviousSlide} type="button">
            ‹
          </button>
          <button aria-label="Następny slajd" className={styles.controlButton} onClick={goToNextSlide} type="button">
            ›
          </button>
        </div>
      </div>

      {children}
    </section>
  );
}
