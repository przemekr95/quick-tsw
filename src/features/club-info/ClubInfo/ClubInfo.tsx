import { useMemo } from 'react';
import type { Club, ClubLandingContent, Player, SectionId } from '../../../shared/types/domain';
import { pickRandomItems } from '../../../shared/utils/random';
import { AboutSection } from '../AboutSection';
import { JoinSection } from '../JoinSection';
import { NextMatchSection } from '../NextMatchSection';
import { RosterSection } from '../RosterSection';
import styles from './ClubInfo.module.scss';

const ROSTER_PREVIEW_SIZE = 4;

interface ClubInfoProps {
  club: Pick<Club, 'name' | 'history'>;
  landingContent: ClubLandingContent;
  players: Player[];
  section: SectionId;
}

const aboutImageBySection: Record<SectionId, { src: string; alt: string }> = {
  mezczyzni: {
    src: '/images/backgrounds/hero-m.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji',
  },
};

export function ClubInfo({ club, landingContent, players, section }: ClubInfoProps) {
  const aboutImage = aboutImageBySection[section];
  const rosterPreview = useMemo(() => pickRandomItems(players, ROSTER_PREVIEW_SIZE), [players]);

  return (
    <section aria-label="Zakładka Klub" className={styles.root}>
      <div className={styles.stack}>
        <div className={styles.introGroup}>
          <AboutSection
            clubName={club.name}
            history={club.history}
            imageAlt={aboutImage.alt}
            imageSrc={aboutImage.src}
          />

          <RosterSection players={rosterPreview} />

          <JoinSection recruitmentPaths={landingContent.recruitmentPaths} />
        </div>

        <NextMatchSection form={landingContent.matchForm} match={landingContent.nextMatch} />
      </div>
    </section>
  );
}
