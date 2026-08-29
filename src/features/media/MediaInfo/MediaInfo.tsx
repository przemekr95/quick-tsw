import { BrandBookSection } from '../BrandBookSection';
import { ClubColorsSection } from '../ClubColorsSection';
import { RosterDownloadSection } from '../RosterDownloadSection';
import styles from './MediaInfo.module.scss';

export function MediaInfo() {
  return (
    <section aria-label="Zakładka Media" className={styles.root}>
      <div className={styles.stack}>
        <BrandBookSection />
        <ClubColorsSection />
        <RosterDownloadSection />
      </div>
    </section>
  );
}
