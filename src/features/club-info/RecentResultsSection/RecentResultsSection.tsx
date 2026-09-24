import type { PlayedMatch } from '../../../shared/types/domain';
import {
  formatMatchDate,
  formatRoundLabel,
  getSetsWon,
  MATCH_LOCATION_LABEL,
} from '../../../shared/utils/matchSchedule';
import styles from './RecentResultsSection.module.scss';

interface RecentResultsSectionProps {
  results: PlayedMatch[];
}

export function RecentResultsSection({ results }: RecentResultsSectionProps) {
  return (
    <section aria-labelledby="ostatnie-wyniki-heading" className={styles.section} id="ostatnie-wyniki">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Wyniki</p>
        <h2 className={styles.title} id="ostatnie-wyniki-heading">
          Ostatnie wyniki
        </h2>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>Brak rozegranych meczów w tym sezonie.</p>
      ) : (
        <ul className={styles.list}>
          {results.map((match) => {
            const setsWon = getSetsWon(match.result);
            const setsLost = match.result.sets.length - setsWon;
            const won = setsWon > setsLost;

            return (
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
                <div className={styles.result}>
                  <div className={styles.resultSummary}>
                    <span className={won ? styles.win : styles.loss}>{won ? 'W' : 'P'}</span>
                    <span className={styles.score}>
                      {setsWon}:{setsLost}
                    </span>
                  </div>
                  <span className={styles.sets}>
                    {match.result.sets.map((set) => `${set.scored}:${set.conceded}`).join(', ')}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
