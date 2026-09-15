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
          Budujemy męską sekcję siatkówki od podstaw - zapraszamy chłopców z roczników 2010-2016 na
          treningi w grupach minisiatkówki, młodzika i kadeta. Dołącz do Białej Gwiazdy i trenuj z
          nami!
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
