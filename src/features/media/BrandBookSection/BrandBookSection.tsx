import { CLUB_BRAND_NAME, MEDIA_DOWNLOADS } from '../../../shared/utils/config';
import { DownloadLink } from '../DownloadLink';
import styles from './BrandBookSection.module.scss';

export function BrandBookSection() {
  return (
    <section aria-labelledby="ksiega-znakow-heading" className={styles.section} id="ksiega-znakow">
      <figure className={styles.figure}>
        <img
          alt={`Herb klubu ${CLUB_BRAND_NAME}`}
          className={styles.crest}
          src={MEDIA_DOWNLOADS.brandBook}
        />
      </figure>

      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>Media</p>
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
