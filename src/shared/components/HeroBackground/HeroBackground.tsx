import type { PropsWithChildren } from 'react';
import type { HeroSlide } from '../../types/domain';
import styles from './HeroBackground.module.scss';

interface HeroBackgroundProps extends PropsWithChildren {
  sectionLabel: string;
  slides: HeroSlide[];
  activeIndex: number;
}

export function HeroBackground({ children, sectionLabel, slides, activeIndex }: HeroBackgroundProps) {
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

      {children}
    </section>
  );
}
