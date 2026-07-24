import { useId, useState } from 'react';
import styles from './SponsorsCarousel.module.scss';

interface SponsorsCarouselProps {
  sponsors: string[];
}

function getSponsorCode(name: string) {
  return name
    .replace(/\[|\]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SponsorsCarousel({ sponsors }: SponsorsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselId = useId();

  if (sponsors.length === 0) {
    return null;
  }

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + sponsors.length) % sponsors.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % sponsors.length);
  };

  return (
    <section aria-label="Karuzela logotypów sponsorów" className={styles.carousel}>
      <div className={styles.controls}>
        <p className={styles.counter}>
          Sponsor {activeIndex + 1} / {sponsors.length}
        </p>
        <div className={styles.buttons}>
          <button
            aria-controls={carouselId}
            aria-label="Poprzedni sponsor"
            className={styles.controlButton}
            onClick={goPrev}
            type="button"
          >
            Wstecz
          </button>
          <button
            aria-controls={carouselId}
            aria-label="Następny sponsor"
            className={styles.controlButton}
            onClick={goNext}
            type="button"
          >
            Dalej
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <ul className={styles.track} id={carouselId} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {sponsors.map((sponsor, index) => (
            <li className={styles.slide} key={sponsor}>
              <article className={styles.logoCard}>
                <figure className={styles.logoMock}>
                  <img
                    alt={`Tło logotypu sponsora ${sponsor}`}
                    src={index % 2 === 0 ? '/images/backgrounds/hero-k.jpg' : '/images/backgrounds/hero-m.jpg'}
                  />
                  <figcaption className={styles.logoOverlay}>LOGOTYP</figcaption>
                </figure>
                <div className={styles.logoMeta}>
                  <span className={styles.logoCode}>{getSponsorCode(sponsor) || 'SP'}</span>
                  <strong>{sponsor}</strong>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div aria-label="Wskaźniki slajdów sponsorów" className={styles.dots}>
        {sponsors.map((sponsor, index) => (
          <button
            aria-label={`Pokaż sponsora ${sponsor}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? styles.dotActive : styles.dot}
            key={sponsor}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
