import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsCarousel } from '../SponsorsCarousel';
import styles from './SponsorsSection.module.scss';

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

export function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  return (
    <section aria-labelledby="sponsorzy-heading" className={styles.section} id="sponsorzy">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Sponsorzy</p>
        <h2 className={styles.title} id="sponsorzy-heading">
          Partnerzy klubu
        </h2>
      </div>
      <SponsorsCarousel sponsors={sponsors} />
    </section>
  );
}
