import type { Club, ClubLandingContent, SectionId } from '../../../shared/types/domain';
import { AboutSection } from '../AboutSection';
import { JoinSection } from '../JoinSection';
import { NextMatchSection } from '../NextMatchSection';
import { RosterSection } from '../RosterSection';
import { SponsorsSection } from '../SponsorsSection';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Pick<Club, 'name' | 'history' | 'arenaAddress' | 'sponsors'>;
  landingContent: ClubLandingContent;
  section: SectionId;
}

const aboutImageBySection: Record<SectionId, { src: string; alt: string }> = {
  kobiety: {
    src: '/images/backgrounds/hero-k.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji',
  },
  mezczyzni: {
    src: '/images/backgrounds/hero-m.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji',
  },
};

export function ClubInfo({ club, landingContent, section }: ClubInfoProps) {
  const aboutImage = aboutImageBySection[section];

  return (
    <section aria-label="Zakładka Klub" className={styles.root}>
      <div className={styles.stack}>
        <AboutSection
          arenaAddress={club.arenaAddress}
          clubName={club.name}
          history={club.history}
          imageAlt={aboutImage.alt}
          imageSrc={aboutImage.src}
        />

        <RosterSection players={landingContent.rosterCards} />

        <JoinSection recruitmentPaths={landingContent.recruitmentPaths} />

        <NextMatchSection countdown={landingContent.matchCountdown} form={landingContent.matchForm} match={landingContent.nextMatch} />

        <SponsorsSection clubName={club.name} sponsors={club.sponsors} />
      </div>
    </section>
  );
}
