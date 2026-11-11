import type { PropsWithChildren } from 'react';
import { useMatch } from 'react-router-dom';
import type { HeroSlide, SectionPath, Sponsor } from '../../types/domain';
import { useHeroSlider } from '../../hooks/useHeroSlider';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { MAIN_CONTENT_ID } from '../../utils/config';
import { Footer } from '../Footer';
import { HeroBackground } from '../HeroBackground';
import { HeroCtaButton } from '../HeroCtaButton';
import { NavBar } from '../NavBar';
import { SponsorsSection } from '../SponsorsSection';
import styles from './SectionLayout.module.scss';

interface SectionLayoutProps extends PropsWithChildren {
  sectionLabel: string;
  sectionName: string;
  sectionPath: SectionPath;
  heroHeading: string;
  pageHeading?: string;
  heroSlides: HeroSlide[];
  clubName: string;
  sponsors: Sponsor[];
}

const DOT_RADIUS = 7;
const DOT_CIRCUMFERENCE = 2 * Math.PI * DOT_RADIUS;

export function SectionLayout({
  children,
  sectionLabel,
  sectionName,
  sectionPath,
  heroHeading,
  pageHeading,
  heroSlides,
  clubName,
  sponsors,
}: SectionLayoutProps) {
  const sectionHomePath = `${sectionPath}/klub`;
  // Matched like the router matches routes, so a trailing slash or different
  // letter case still shows the hero on the klub tab.
  const isSectionHome = useMatch(sectionHomePath) !== null;

  useScrollToTop();

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
                {/* No empty heading or nameless button before the hero content loads. */}
                {heroHeading && <h1 className={styles.sectionLabel}>{heroHeading}</h1>}
                <p className={styles.heroTitle}>{currentSlide?.title}</p>
                <p className={styles.heroText}>{currentSlide?.text}</p>
              </div>

              <div className={styles.heroActions}>
                {currentSlide && (
                  <HeroCtaButton
                    href={currentSlide.ctaHref}
                    label={currentSlide.ctaLabel}
                    relativeTo={sectionHomePath}
                  />
                )}
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

      <main className={styles.main} id={MAIN_CONTENT_ID} tabIndex={-1}>
        {!isSectionHome && pageHeading && <h1 className={styles.pageHeading}>{pageHeading}</h1>}
        <div className={styles.mainInner}>{children}</div>
      </main>

      <SponsorsSection clubName={clubName} sponsors={sponsors} />

      <Footer sectionName={sectionName} sectionPath={sectionPath} />
    </div>
  );
}
