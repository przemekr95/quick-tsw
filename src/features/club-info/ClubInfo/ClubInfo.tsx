import type { ClubLandingContent } from '../../../shared/types/domain';
import type { SectionId } from '../../../shared/types/domain';
import type { Club } from '../../../shared/types/domain';
import { SponsorsCarousel } from '../SponsorsCarousel';
import { AboutSection, JoinSpotlightSection, NextMatchSection, RosterSection } from './sections';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Pick<Club, 'arenaAddress' | 'sponsors'>;
  landingContent: ClubLandingContent;
  section: SectionId;
}

const clubImagesBySection: Record<SectionId, { heroSrc: string; detailSrc: string; alt: string }> = {
  kobiety: {
    heroSrc: '/images/backgrounds/hero-k.jpg',
    detailSrc: '/images/backgrounds/hero-k.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji',
  },
  mezczyzni: {
    heroSrc: '/images/backgrounds/hero-m.jpg',
    detailSrc: '/images/backgrounds/hero-m.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji',
  },
};

const sectionAnchors = [
  { id: 'o-klubie', label: 'O klubie' },
  { id: 'nasza-druzyna', label: 'Nasza drużyna' },
  { id: 'dolacz-do-nas', label: 'Dołącz do nas' },
  { id: 'najblizszy-mecz', label: 'Najbliższy mecz' },
] as const;

export function ClubInfo({ club, landingContent, section }: ClubInfoProps) {
  const sectionVisual = clubImagesBySection[section];

  return (
    <section aria-label="Zakładka Klub" className={styles.root}>

      <nav aria-label="Nawigacja sekcji klubu" className={styles.tabRail}>
        <ul>
          {sectionAnchors.map((anchor) => (
            <li key={anchor.id}>
              <a href={`#${anchor.id}`}>{anchor.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.contentStack}>
        <AboutSection arenaAddress={club.arenaAddress} imageAlt={sectionVisual.alt} imageSrc={sectionVisual.detailSrc} />

        <RosterSection rosterCards={landingContent.rosterCards} />

        <JoinSpotlightSection imageSrc={sectionVisual.heroSrc} recruitmentPaths={landingContent.recruitmentPaths} />
      </div>

      <NextMatchSection matchCountdown={landingContent.matchCountdown} matchForm={landingContent.matchForm} />

      <section aria-labelledby="sponsors-heading" className={styles.sponsorsBlock}>
        <div className={styles.sponsorIntro}>
          <p className={styles.blockIndex}>05</p>
          <h3 id="sponsors-heading">Sponsorzy</h3>
          <p>Partnerzy, którzy wspierają rozwój zespołu i codzienną pracę klubu.</p>
        </div>
        <SponsorsCarousel sponsors={club.sponsors} />
      </section>
    </section>
  );
}
