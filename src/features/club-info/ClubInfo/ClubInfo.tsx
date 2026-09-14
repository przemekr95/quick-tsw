import type { Club, ClubLandingContent, SectionId } from '../../../shared/types/domain';
import { AboutSection } from '../AboutSection';
import { JoinSection } from '../JoinSection';
import { NextMatchSection } from '../NextMatchSection';
import { RosterSection } from '../RosterSection';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Pick<Club, 'name' | 'history' | 'arenaAddress'>;
  landingContent: ClubLandingContent;
  section: SectionId;
}

const aboutImageBySection: Record<SectionId, { src: string; alt: string }> = {
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
        <div className={styles.introGroup}>
          <AboutSection
            arenaAddress={club.arenaAddress}
            clubName={club.name}
            history={club.history}
            imageAlt={aboutImage.alt}
            imageSrc={aboutImage.src}
          />

          <RosterSection players={landingContent.rosterCards} />

          <JoinSection recruitmentPaths={landingContent.recruitmentPaths} />
        </div>

        <NextMatchSection
          countdown={landingContent.matchCountdown}
          form={landingContent.matchForm}
          match={landingContent.nextMatch}
        />
      </div>
    </section>
  );
}
