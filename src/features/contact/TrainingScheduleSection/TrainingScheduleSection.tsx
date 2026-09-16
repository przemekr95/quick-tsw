import type { TrainingGroup } from '../../../shared/types/domain';
import styles from './TrainingScheduleSection.module.scss';

interface TrainingScheduleSectionProps {
  trainingGroups: TrainingGroup[];
}

export function TrainingScheduleSection({ trainingGroups }: TrainingScheduleSectionProps) {
  return (
    <section aria-labelledby="treningi-heading" className={styles.section} id="treningi">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Harmonogram</p>
        <h2 className={styles.title} id="treningi-heading">
          Treningi
        </h2>
      </div>

      <div className={styles.groups}>
        {trainingGroups.map((group) => (
          <div className={styles.group} key={group.name}>
            <h3 className={styles.groupName}>{group.name}</h3>

            <div className={styles.venue}>
              <p className={styles.venueName}>{group.venue}</p>
              <p className={styles.venueAddress}>{group.address}</p>
            </div>

            <ul className={styles.grid}>
              {group.sessions.map((session) => (
                <li className={styles.cell} key={`${session.day}-${session.time}`}>
                  <p className={styles.day}>{session.day}</p>
                  <p className={styles.time}>{session.time}</p>
                </li>
              ))}
            </ul>

            <a
              className={styles.mapLink}
              href={group.mapUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Zobacz na mapie
              <span aria-hidden="true" className={styles.mapArrow}>
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
