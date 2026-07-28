import { useMemo, useState } from 'react';
import type { Sponsor } from '../../../shared/types/domain';
import styles from './SponsorsCarousel.module.scss';

interface SponsorsCarouselProps {
  sponsors: Sponsor[];
}

function normalizeSponsorName(name: string) {
  return name.replace(/\[|\]/g, '').trim();
}

function getSponsorMeta(sponsor: Sponsor) {
  const name = normalizeSponsorName(sponsor.name);

  return {
    name,
    logoSrc: sponsor.logoSrc?.trim() ?? '',
    websiteUrl: sponsor.websiteUrl?.trim() ?? '',
  };
}

function getSponsorCode(name: string) {
  return normalizeSponsorName(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SponsorsCarousel({ sponsors }: SponsorsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedSponsors = useMemo(() => {
    const normalizedSponsors = sponsors.map(getSponsorMeta).filter((sponsor) => sponsor.name.length > 0);

    return normalizedSponsors;
  }, [sponsors]);

  if (normalizedSponsors.length === 0) {
    return null;
  }

  const hasMultipleSponsors = normalizedSponsors.length > 1;

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + normalizedSponsors.length) % normalizedSponsors.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % normalizedSponsors.length);
  };

  return (
    <section aria-label="Karuzela logotypów sponsorów" className={styles.carousel}>
      <div className={styles.controls}>
        <p className={styles.supportLabel}>Dziękujemy za wsparcie</p>
        <p className={styles.counter}>
          Sponsor {activeIndex + 1} / {normalizedSponsors.length}
        </p>
        {hasMultipleSponsors ? (
          <div className={styles.buttons}>
            <button
              aria-label="Poprzedni sponsor"
              className={styles.controlButton}
              onClick={goPrev}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Następny sponsor"
              className={styles.controlButton}
              onClick={goNext}
              type="button"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      <div className={styles.viewport}>
        <ul className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {normalizedSponsors.map((sponsor, index) => (
            <li aria-label={`Sponsor ${sponsor.name}`} className={styles.slide} key={`${sponsor.name}-${index}`}>
              <article className={styles.logoCard}>
                {sponsor.websiteUrl ? (
                  <a
                    aria-label={`Odwiedź stronę sponsora ${sponsor.name}`}
                    className={styles.logoLink}
                    href={sponsor.websiteUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div aria-hidden="true" className={styles.logoMock}>
                      {sponsor.logoSrc ? (
                        <img alt={`Logotyp sponsora ${sponsor.name}`} className={styles.logoImage} src={sponsor.logoSrc} />
                      ) : (
                        <span className={styles.logoCode}>{getSponsorCode(sponsor.name) || 'SP'}</span>
                      )}
                    </div>
                  </a>
                ) : (
                  <div aria-hidden="true" className={styles.logoMock}>
                    {sponsor.logoSrc ? (
                      <img alt={`Logotyp sponsora ${sponsor.name}`} className={styles.logoImage} src={sponsor.logoSrc} />
                    ) : (
                      <span className={styles.logoCode}>{getSponsorCode(sponsor.name) || 'SP'}</span>
                    )}
                  </div>
                )}
                <p className={styles.logoName}>{sponsor.name}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
