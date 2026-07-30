import { Link } from 'react-router-dom';
import type { ClubRosterCard } from '../../../../shared/types/domain';
import styles from '../ClubInfo.module.scss';

interface RosterSectionProps {
  rosterCards: ClubRosterCard[];
}

export function RosterSection({ rosterCards }: RosterSectionProps) {
  return (
    <section className={styles.rosterShowcase} id="nasza-druzyna" aria-labelledby="nasza-druzyna-heading">
      <div className={styles.rosterHeader}>
        <div className={styles.rosterIntro}>
          <p className={styles.rosterEyebrow}>Skład</p>
          <h3 id="nasza-druzyna-heading" className={styles.rosterTitle}>Poznaj drużynę.</h3>
        </div>
        <Link className={styles.rosterLink} to="../druzyna">
          Pełny skład <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>

      <div className={styles.rosterGrid}>
        {rosterCards.map((player) => (
          <article className={styles.rosterCard} key={player.name}>
            <img alt={`Zdjęcie zawodnika ${player.name}`} src={player.imageSrc} />
            <span aria-hidden="true" className={styles.rosterNumber}>{player.number}</span>
            <div className={styles.rosterMeta}>
              <p className={styles.rosterPosition}>{player.position}</p>
              <p className={styles.rosterName}>{player.name}</p>
              <p className={styles.rosterStats}>{player.stats}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
