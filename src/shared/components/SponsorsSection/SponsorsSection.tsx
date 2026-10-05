import type { Sponsor } from '../../../shared/types/domain';
import { CLUB_WEBSITE_URL } from '../../utils/config';
import { SponsorsWall } from '../SponsorsWall';
import styles from './SponsorsSection.module.scss';

interface SponsorsSectionProps {
  clubName: string;
  sponsors: Sponsor[];
}

export function SponsorsSection({ clubName, sponsors }: SponsorsSectionProps) {
  return (
    <section aria-label={`Sponsorzy klubu ${clubName}`} className={styles.section}>
      <a
        aria-label={`Strona klubu ${clubName} (otwiera się w nowej karcie)`}
        className={styles.crestLink}
        href={CLUB_WEBSITE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt={`Herb klubu ${clubName}`} className={styles.crest} src="/tsw-herb.png" />
      </a>
      <SponsorsWall sponsors={sponsors} />
    </section>
  );
}
