import { useMatchCountdown } from '../../../shared/hooks';
import type { MatchFormResult, UpcomingMatch } from '../../../shared/types/domain';
import {
  formatKickoffLabel,
  MATCH_LOCATION_LABEL,
  toKickoffIso,
} from '../../../shared/utils/matchSchedule';
import styles from './NextMatchSection.module.scss';

interface NextMatchSectionProps {
  match: UpcomingMatch;
  form: MatchFormResult[];
}

const formResultClassName: Record<MatchFormResult, string> = {
  W: styles.win,
  P: styles.loss,
  '-': styles.none,
};

export function NextMatchSection({ match, form }: NextMatchSectionProps) {
  const countdown = useMatchCountdown(toKickoffIso(match));

  return (
    <section
      aria-labelledby="najblizszy-mecz-heading"
      className={styles.section}
      id="najblizszy-mecz"
    >
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>{match.competition}</p>
          <h2 className={styles.title} id="najblizszy-mecz-heading">
            {match.opponent}
          </h2>
        </div>
        <p className={styles.meta}>
          {formatKickoffLabel(match)} · {MATCH_LOCATION_LABEL[match.location]}
        </p>
      </div>

      <div className={styles.details}>
        {countdown ? (
          <ul className={styles.countdown}>
            {countdown.map((item) => (
              <li key={item.label}>
                <p className={styles.countdownValue}>{item.value}</p>
                <span className={styles.countdownLabel}>{item.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.countdownPending}>Godzina meczu zostanie ogłoszona wkrótce.</p>
        )}

        <div className={styles.form}>
          <p className={styles.formLabel}>Forma</p>
          <ul className={styles.formList}>
            {form.map((result, index) => (
              <li className={formResultClassName[result]} key={`${result}-${index}`}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
