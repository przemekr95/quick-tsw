import type { PartnershipTier, PartnershipTierKey } from '../../../shared/types/domain';
import styles from './PartnershipTiersSection.module.scss';

interface PartnershipTiersSectionProps {
  tiers: PartnershipTier[];
}

const tierCellClassName: Record<PartnershipTierKey, string> = {
  primary: `${styles.cell} ${styles.cellFeatured}`,
  secondary: styles.cell,
  tertiary: styles.cell,
};

export function PartnershipTiersSection({ tiers }: PartnershipTiersSectionProps) {
  return (
    <section
      aria-labelledby="pakiety-partnerskie-heading"
      className={styles.section}
      id="pakiety-partnerskie"
    >
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Oferta</p>
        <h2 className={styles.title} id="pakiety-partnerskie-heading">
          Pakiety partnerskie
        </h2>
      </div>

      <ul className={styles.grid}>
        {tiers.map((tier) => (
          <li className={tierCellClassName[tier.key]} key={tier.key}>
            {tier.key === 'primary' ? <p className={styles.featuredBadge}>Polecane</p> : null}
            <p className={styles.tierName}>{tier.name}</p>
            <p className={styles.tierDescription}>{tier.description}</p>
            <ul className={styles.perks}>
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
