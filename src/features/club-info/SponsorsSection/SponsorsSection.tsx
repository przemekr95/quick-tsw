import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsWall } from '../SponsorsWall';
import styles from './SponsorsSection.module.scss';

interface SponsorsSectionProps {
  clubName: string;
  sponsors: Sponsor[];
}

export function SponsorsSection({ clubName, sponsors }: SponsorsSectionProps) {
  return (
    <section aria-label={`Sponsorzy klubu ${clubName}`} className={styles.section}>
      <img alt={`Herb klubu ${clubName}`} className={styles.crest} src="/tsw-herb.png" />
      <SponsorsWall sponsors={sponsors} />
    </section>
  );
}
