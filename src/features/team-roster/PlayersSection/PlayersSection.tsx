import type { Player } from '../../../shared/types/domain';
import styles from './PlayersSection.module.scss';

interface PlayersSectionProps {
  players: Player[];
}

export function PlayersSection({ players }: PlayersSectionProps) {
  return (
    <section aria-labelledby="zawodnicy-heading" className={styles.section} id="zawodnicy">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Skład</p>
        <h2 className={styles.title} id="zawodnicy-heading">
          Zawodnicy
        </h2>
      </div>

      <ul className={styles.grid}>
        {players.map((player) => (
          <li className={styles.card} key={`${player.number}-${player.lastName}`}>
            <img
              alt={`Zdjęcie zawodnika ${player.firstName} ${player.lastName}`}
              className={styles.image}
              loading="lazy"
              src={player.photoSrc}
            />
            <span className={styles.number}>{player.number}</span>
            <div className={styles.meta}>
              <p className={styles.position}>{player.position}</p>
              <p className={styles.name}>
                {player.firstName} {player.lastName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
