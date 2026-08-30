import { ArrowLink } from '../../club-info/ArrowLink';
import styles from './PartnershipWaysSection.module.scss';

const WAYS = [
  'Wsparcie finansowe - jednorazowe lub sezonowe',
  'Wsparcie rzeczowe - sprzęt sportowy, catering, transport',
  'Sponsoring wydarzenia - turniej, mecz wyjazdowy, obóz szkoleniowy',
  'Patronat medialny - wspólne działania promocyjne',
];

export function PartnershipWaysSection() {
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
        <p className={styles.lead}>
          Każda firma jest inna - dlatego wspólnie ustalamy zakres współpracy dopasowany do Twoich
          możliwości i celów.
        </p>
      </div>

      <ul className={styles.list}>
        {WAYS.map((way) => (
          <li key={way}>{way}</li>
        ))}
      </ul>

      <ArrowLink to="../kontakt" variant="solid">
        Skontaktuj się
      </ArrowLink>
    </section>
  );
}
