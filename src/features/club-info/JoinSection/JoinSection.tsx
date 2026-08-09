import { ArrowLink } from '../ArrowLink';
import styles from './JoinSection.module.scss';

interface JoinSectionProps {
  recruitmentPaths: string[];
}

export function JoinSection({ recruitmentPaths }: JoinSectionProps) {
  return (
    <section aria-labelledby="dolacz-do-nas-heading" className={styles.section} id="dolacz-do-nas">
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>Dołącz do nas</p>
          <h2 className={styles.title} id="dolacz-do-nas-heading">
            Twoje miejsce jest na boisku
          </h2>
        </div>
        <p className={styles.lead}>
          Zapraszamy zawodników na każdym poziomie - od młodych adeptów po doświadczonych rywalizatorów.
          Oferujemy usystematyzowane treningi, ligi rozgrywkowe i społeczność, która wydobędzie z Ciebie
          to, co najlepsze.
        </p>
      </div>

      <ul className={styles.list}>
        {recruitmentPaths.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>

      <ArrowLink to="../kontakt" variant="solid">
        Skontaktuj się
      </ArrowLink>
    </section>
  );
}
