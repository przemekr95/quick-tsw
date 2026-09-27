import type { Patron } from '../../../shared/types/domain';
import { PatronsWallSection } from '../PatronsWallSection';
import styles from './PatronsInfo.module.scss';

interface PatronsInfoProps {
  patrons: Patron[];
}

export function PatronsInfo({ patrons }: PatronsInfoProps) {
  return (
    <section aria-label="Zakładka Przyjaciele Białej Gwiazdy" className={styles.root}>
      <div className={styles.stack}>
        <PatronsWallSection patrons={patrons} />
      </div>
    </section>
  );
}
