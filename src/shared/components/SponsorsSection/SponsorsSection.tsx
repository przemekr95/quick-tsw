import type { Sponsor } from '../../../shared/types/domain';
import { CLUB_CREST_SRC, CLUB_WEBSITE_URL } from '../../utils/config';
import { SponsorsWall } from '../SponsorsWall';
import styles from './SponsorsSection.module.scss';

interface SponsorsSectionProps {
  clubName: string;
  sponsors: Sponsor[];
}

export function SponsorsSection({ clubName, sponsors }: SponsorsSectionProps) {
  // The club name arrives with the club data; until then (or if it never
  // does) the labels drop it instead of ending in a stray space.
  const club = clubName ? `klubu ${clubName}` : 'klubu';

  return (
    <section aria-label={`Sponsorzy ${club}`} className={styles.section}>
      <a
        aria-label={`Strona ${club} (otwiera się w nowej karcie)`}
        className={styles.crestLink}
        href={CLUB_WEBSITE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt={`Herb ${club}`} className={styles.crest} src={CLUB_CREST_SRC} />
      </a>
      <SponsorsWall sponsors={sponsors} />
    </section>
  );
}
