import type { SectionCoordinator } from '../../../shared/types/domain';
import { toTelHref } from '../../../shared/utils/phone';
import styles from './CoordinatorsSection.module.scss';

interface CoordinatorsSectionProps {
  coordinators: SectionCoordinator[];
}

export function CoordinatorsSection({ coordinators }: CoordinatorsSectionProps) {
  return (
    <section aria-labelledby="koordynatorzy-heading" className={styles.section} id="koordynatorzy">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Kontakt do sekcji</p>
        <h2 className={styles.title} id="koordynatorzy-heading">
          Koordynatorzy
        </h2>
      </div>

      <ul className={styles.grid}>
        {coordinators.map((coordinator) => (
          <li className={styles.card} key={`${coordinator.role}-${coordinator.lastName}`}>
            <img
              alt={`Zdjęcie ${coordinator.firstName} ${coordinator.lastName}`}
              className={styles.image}
              loading="lazy"
              src={coordinator.photoSrc}
            />
            <div className={styles.meta}>
              <p className={styles.role}>{coordinator.role}</p>
              <p className={styles.name}>
                {coordinator.firstName} {coordinator.lastName}
              </p>
              <div className={styles.links}>
                <a className={styles.link} href={toTelHref(coordinator.phone)}>
                  {coordinator.phone}
                </a>
                <a className={styles.link} href={`mailto:${coordinator.email}`}>
                  {coordinator.email}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
