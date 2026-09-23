import type { UpcomingMatch } from '../../../shared/types/domain';
import { MATCH_LOCATION_LABEL } from '../../../shared/utils/matchSchedule';
import styles from './UpcomingMatchesSection.module.scss';

interface UpcomingMatchesSectionProps {
  matches: UpcomingMatch[];
}

function formatMatchDate(matchDate: string): string {
  const [year, month, day] = matchDate.split('-');

  return `${day}.${month}.${year}`;
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
        <p className={styles.empty}>Kolejne terminy zostaną ogłoszone wkrótce.</p>
      ) : (
        <ul className={styles.list}>
          {matches.map((match) => (
            <li className={styles.row} key={`${match.matchDate}-${match.opponent}`}>
              <div className={styles.date}>
                <span className={styles.round}>Kolejka {match.round}</span>
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
      )}
    </section>
  );
}
