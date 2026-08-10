import type { ClubMatchCountdownItem, ClubNextMatch } from '../../../shared/types/domain';
import { ArrowLink } from '../ArrowLink';
import styles from './NextMatchSection.module.scss';

interface NextMatchSectionProps {
  match: ClubNextMatch;
  countdown: ClubMatchCountdownItem[];
  form: string[];
}

export function NextMatchSection({ match, countdown, form }: NextMatchSectionProps) {
  return (
    <section aria-labelledby="najblizszy-mecz-heading" className={styles.section} id="najblizszy-mecz">
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>{match.competition}</p>
          <h2 className={styles.title} id="najblizszy-mecz-heading">
            {match.opponent}
          </h2>
        </div>
        <p className={styles.meta}>
          {match.kickoffLabel} · {match.venue}
        </p>
      </div>

      <div className={styles.details}>
        <ul className={styles.countdown}>
          {countdown.map((item) => (
            <li key={item.label}>
              <p className={styles.countdownValue}>{item.value}</p>
              <span className={styles.countdownLabel}>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.form}>
          <p className={styles.formLabel}>Forma</p>
          <ul className={styles.formList}>
            {form.map((result, index) => (
              <li className={result === 'L' ? styles.loss : styles.win} key={`${result}-${index}`}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ArrowLink to="../kontakt">Zapytaj o bilety</ArrowLink>
    </section>
  );
}
