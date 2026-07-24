import type { Player } from '../../../shared/types/domain';
import styles from './TeamRoster.module.scss';

interface TeamRosterProps {
  players: Player[];
}

export function TeamRoster({ players }: TeamRosterProps) {
  return (
    <section aria-labelledby="team-heading">
      <h2 id="team-heading">Drużyna</h2>
      <ul className={styles.grid}>
        {players.map((player) => (
          <li className={styles.card} key={`${player.number}-${player.lastName}`}>
            <div aria-hidden="true" className={styles.photo}>
              {player.photoPlaceholder}
            </div>
            <p className={styles.name}>
              {player.firstName} {player.lastName}
            </p>
            <p>#{player.number}</p>
            <p>{player.position}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
