import styles from './PartnershipIntroSection.module.scss';

interface PartnershipIntroSectionProps {
  leadText: string;
  benefits: string[];
}

export function PartnershipIntroSection({ leadText, benefits }: PartnershipIntroSectionProps) {
  return (
    <section
      aria-labelledby="zostan-partnerem-heading"
      className={styles.section}
      id="zostan-partnerem"
    >
      <div className={styles.copy}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="zostan-partnerem-heading">
            Zostań Partnerem
          </h2>
        </div>
        <p className={styles.lead}>{leadText}</p>
      </div>

      <ul className={styles.list}>
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </section>
  );
}
