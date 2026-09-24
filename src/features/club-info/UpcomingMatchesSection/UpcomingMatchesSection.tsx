import type { UpcomingMatch } from '../../../shared/types/domain';
import {
  formatMatchDate,
  formatRoundLabel,
  MATCH_LOCATION_LABEL,
} from '../../../shared/utils/matchSchedule';
import styles from './UpcomingMatchesSection.module.scss';

interface UpcomingMatchesSectionProps {
  matches: UpcomingMatch[];
}

export function UpcomingMatchesSection({ matches }: UpcomingMatchesSectionProps) {
  return (
    <section aria-labelledby="kolejne-mecze-heading" className={styles.section} id="kolejne-mecze">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Terminarz</p>
        <h2 className={styles.title} id="kolejne-mecze-heading">
          Kolejne mecze
        </h2>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty}>Brak kolejnych meczów w terminarzu.</p>
      ) : (
        <div
          aria-label="Lista kolejnych meczów"
          className={styles.listScroll}
          role="region"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard-focusable scroll region (WCAG SCR29)
          tabIndex={0}
        >
          <ul className={styles.list}>
            {matches.map((match) => (
              <li className={styles.row} key={`${match.matchDate}-${match.opponent}`}>
                <div className={styles.date}>
                  <span className={styles.round}>{formatRoundLabel(match)}</span>
                  <span className={styles.day}>{formatMatchDate(match.matchDate)}</span>
                </div>
                <span className={styles.opponent}>{match.opponent}</span>
                <span
                  className={`${styles.location} ${match.location === 'home' ? styles.locationHome : ''}`}
                >
                  {MATCH_LOCATION_LABEL[match.location]}
                </span>
                <span className={styles.time}>{match.kickoffTime ?? 'TBD'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
