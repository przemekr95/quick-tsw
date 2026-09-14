import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import type { HeroSlide, SectionPath, Sponsor } from '../../types/domain';
import { useHeroSlider } from '../../hooks/useHeroSlider';
import { SponsorsSection } from '../../../features/club-info/SponsorsSection';
import { Footer } from '../Footer';
import { HeroBackground } from '../HeroBackground';
import { HeroCtaButton } from '../HeroCtaButton';
import { NavBar } from '../NavBar';
import styles from './SectionLayout.module.scss';

interface SectionLayoutProps extends PropsWithChildren {
  sectionLabel: string;
  sectionPath: SectionPath;
  heroHeading: string;
  ctaLabel: string;
  heroSlides: HeroSlide[];
  clubName: string;
  sponsors: Sponsor[];
}

const DOT_RADIUS = 7;
const DOT_CIRCUMFERENCE = 2 * Math.PI * DOT_RADIUS;

export function SectionLayout({
  children,
  sectionLabel,
  sectionPath,
  heroHeading,
  ctaLabel,
  heroSlides,
  clubName,
  sponsors,
}: SectionLayoutProps) {
  const { pathname } = useLocation();
  const isSectionHome = pathname === `${sectionPath}/klub`;

  const { activeIndex, slideKey, goTo } = useHeroSlider(heroSlides);

  const currentSlide = heroSlides[activeIndex] ?? heroSlides[0];

  return (
    <div className={styles.page}>
      {isSectionHome ? (
        <HeroBackground sectionLabel={sectionLabel} slides={heroSlides} activeIndex={activeIndex}>
          <div className={styles.heroInner}>
            <header className={styles.header}>
              <NavBar sectionPath={sectionPath} />
            </header>

            <div className={styles.heroContent}>
              <div className={styles.heroCopy} key={activeIndex}>
                <h1 className={styles.sectionLabel}>{heroHeading}</h1>
                <p className={styles.heroTitle}>{currentSlide?.title}</p>
                <p className={styles.heroText}>{currentSlide?.text}</p>
              </div>

              <div className={styles.heroActions}>
                <HeroCtaButton label={ctaLabel} targetId="section-content" />
              </div>

              {heroSlides.length > 1 && (
                <div aria-label="Paginacja slajdów" className={styles.heroPagination} role="group">
                  {heroSlides.map((slide, index) => (
                    <button
                      aria-label={`Przejdź do slajdu ${index + 1}`}
                      aria-pressed={index === activeIndex}
                      className={styles.dotButton}
                      key={slide.id}
                      onClick={() => goTo(index)}
                      type="button"
                    >
                      <svg aria-hidden="true" className={styles.dotSvg} viewBox="0 0 20 20">
                        {index !== activeIndex && (
                          <circle className={styles.dotInner} cx="10" cy="10" r="2.5" />
                        )}
                        {index === activeIndex && (
                          <circle
                            className={styles.dotFill}
                            cx="10"
                            cy="10"
                            key={`fill-${slideKey}`}
                            r={DOT_RADIUS}
                            strokeDasharray={DOT_CIRCUMFERENCE}
                            strokeDashoffset={DOT_CIRCUMFERENCE}
                          />
                        )}
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </HeroBackground>
      ) : (
        <header className={styles.headerInline}>
          <NavBar sectionPath={sectionPath} />
        </header>
      )}

      <main className={styles.main} id="section-content" tabIndex={-1}>
        <div className={styles.mainInner}>{children}</div>
      </main>

      <SponsorsSection clubName={clubName} sponsors={sponsors} />

      <Footer sectionPath={sectionPath} />
    </div>
  );
}
