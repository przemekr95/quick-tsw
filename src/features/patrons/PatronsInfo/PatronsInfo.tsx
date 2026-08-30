import type { Patron, Sponsor } from '../../../shared/types/domain';
import { SponsorsSection } from '../../club-info/SponsorsSection';
import { PatronsWallSection } from '../PatronsWallSection';
import styles from './PatronsInfo.module.scss';

interface PatronsInfoProps {
  patrons: Patron[];
  clubName: string;
  sponsors: Sponsor[];
}

export function PatronsInfo({ patrons, clubName, sponsors }: PatronsInfoProps) {
  return (
    <section aria-label="Zakładka Strefa Przyjaciół" className={styles.root}>
      <div className={styles.stack}>
        <PatronsWallSection patrons={patrons} />
        <SponsorsSection clubName={clubName} sponsors={sponsors} />
      </div>
    </section>
  );
}
