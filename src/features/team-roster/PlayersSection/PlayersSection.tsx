import { ExternalLinkIcon } from '../../../shared/components/ExternalLinkIcon';
import type { Player, PlayerPosition } from '../../../shared/types/domain';
import styles from './PlayersSection.module.scss';

interface PlayersSectionProps {
  players: Player[];
}

const positionOrder: PlayerPosition[] = [
  'Rozgrywający',
  'Atakujący',
  'Przyjmujący',
  'Środkowy',
  'Libero',
];

const positionGroupLabel: Record<PlayerPosition, string> = {
  Rozgrywający: 'Rozgrywający',
  Atakujący: 'Atakujący',
  Przyjmujący: 'Przyjmujący',
  Środkowy: 'Środkowi',
  Libero: 'Libero',
};

const positionSlug: Record<PlayerPosition, string> = {
  Rozgrywający: 'rozgrywajacy',
  Atakujący: 'atakujacy',
  Przyjmujący: 'przyjmujacy',
  Środkowy: 'srodkowi',
  Libero: 'libero',
};

function groupByPosition(
  players: Player[],
): Array<{ position: PlayerPosition; players: Player[] }> {
  return positionOrder
    .map((position) => ({
      position,
      players: players
        .filter((player) => player.position === position)
        .sort((a, b) => a.number - b.number),
    }))
    .filter((group) => group.players.length > 0);
}

export function PlayersSection({ players }: PlayersSectionProps) {
  const groups = groupByPosition(players);

  return (
    <section aria-labelledby="zawodnicy-heading" className={styles.section} id="zawodnicy">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Skład</p>
        <h2 className={styles.title} id="zawodnicy-heading">
          Zawodnicy
        </h2>
      </div>

      <div className={styles.groups}>
        {groups.map((group) => {
          const headingId = `zawodnicy-${positionSlug[group.position]}`;

          return (
            <div className={styles.group} key={group.position}>
              <div className={styles.groupHeading}>
                <h3 className={styles.groupTitle} id={headingId}>
                  {positionGroupLabel[group.position]}
                </h3>
              </div>

              <ul aria-labelledby={headingId} className={styles.grid}>
                {group.players.map((player) => (
                  <li
                    className={
                      player.profileUrl ? `${styles.card} ${styles.cardLinked}` : styles.card
                    }
                    key={`${player.number}-${player.lastName}`}
                  >
                    <img
                      alt={`Zdjęcie zawodnika nr ${player.number}, ${player.firstName} ${player.lastName}`}
                      className={styles.image}
                      loading="lazy"
                      src={player.photoSrc}
                    />
                    <span aria-hidden="true" className={styles.number}>
                      {player.number}
                    </span>
                    <div className={styles.meta}>
                      <p className={styles.name}>
                        {player.firstName} {player.lastName}
                      </p>
                      {player.profileUrl && <ExternalLinkIcon className={styles.externalIcon} />}
                    </div>
                    {player.profileUrl && (
                      <a
                        className={styles.profileLink}
                        href={player.profileUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className={styles.srOnly}>
                          Profil zawodnika {player.firstName} {player.lastName} (otwiera się w nowej
                          karcie)
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
