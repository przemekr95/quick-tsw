import type { Player } from '../../../shared/types/domain';
import { ArrowLink } from '../ArrowLink';
import styles from './RosterSection.module.scss';

interface RosterSectionProps {
  players: Player[];
}

export function RosterSection({ players }: RosterSectionProps) {
  return (
    <section aria-labelledby="nasza-druzyna-heading" className={styles.section} id="nasza-druzyna">
      <div className={styles.header}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>Skład</p>
          <h2 className={styles.title} id="nasza-druzyna-heading">
            Poznaj drużynę
          </h2>
        </div>
        <ArrowLink to="../druzyna">Pełny skład</ArrowLink>
      </div>

      <div className={styles.grid}>
        {players.map((player) => (
          <article className={styles.card} key={player.number}>
            <img
              alt={`Zdjęcie zawodnika ${player.firstName} ${player.lastName}`}
              className={styles.image}
              src={player.photoSrc}
            />
            <div className={styles.meta}>
              <p className={styles.position}>{player.position}</p>
              <p className={styles.name}>
                {player.firstName} {player.lastName}
              </p>
            </div>
            <span aria-hidden="true" className={styles.number}>
              {player.number}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
