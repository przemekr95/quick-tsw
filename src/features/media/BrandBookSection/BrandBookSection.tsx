import { CLUB_BRAND_NAME, CLUB_CREST_SRC, MEDIA_DOWNLOADS } from '../../../shared/utils/config';
import { DownloadLink } from '../DownloadLink';
import styles from './BrandBookSection.module.scss';

export function BrandBookSection() {
  return (
    <section aria-labelledby="ksiega-znakow-heading" className={styles.section} id="ksiega-znakow">
      <figure className={styles.figure}>
        <img alt={`Herb klubu ${CLUB_BRAND_NAME}`} className={styles.crest} src={CLUB_CREST_SRC} />
      </figure>

      <div className={styles.copy}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="ksiega-znakow-heading">
            Księga znaków
          </h2>
        </div>

        <p className={styles.lead}>
          Herb, warianty logotypu i zasady jego stosowania w jednym dokumencie - do pobrania dla
          mediów, partnerów i sponsorów klubu.
        </p>

        <DownloadLink href={MEDIA_DOWNLOADS.brandBook}>Pobierz księgę znaków</DownloadLink>
      </div>
    </section>
  );
}
