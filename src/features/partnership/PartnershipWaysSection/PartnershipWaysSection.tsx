import { ArrowLink } from '../../club-info/ArrowLink';
import styles from './PartnershipWaysSection.module.scss';

interface PartnershipWaysSectionProps {
  leadText: string;
  ways: string[];
}

export function PartnershipWaysSection({ leadText, ways }: PartnershipWaysSectionProps) {
  return (
    <section
      aria-labelledby="formy-wspolpracy-heading"
      className={styles.section}
      id="formy-wspolpracy"
    >
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>Elastyczna współpraca</p>
          <h2 className={styles.title} id="formy-wspolpracy-heading">
            Formy współpracy
          </h2>
        </div>
        <p className={styles.lead}>{leadText}</p>
      </div>

      <ul className={styles.list}>
        {ways.map((way) => (
          <li key={way}>{way}</li>
        ))}
      </ul>

      <ArrowLink to="../kontakt" variant="solid">
        Skontaktuj się
      </ArrowLink>
    </section>
  );
}
