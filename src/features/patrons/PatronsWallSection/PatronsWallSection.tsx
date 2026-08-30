import type { Patron, PatronTier } from '../../../shared/types/domain';
import styles from './PatronsWallSection.module.scss';

interface PatronsWallSectionProps {
  patrons: Patron[];
}

const tierOrder: PatronTier[] = [1, 2, 3];

const tierLabel: Record<PatronTier, string> = {
  1: 'Mecenas Honorowy',
  2: 'Mecenas',
  3: 'Przyjaciel Klubu',
};

const tierBadgeClassName: Record<PatronTier, string> = {
  1: styles.badgePrimary,
  2: styles.badgeSecondary,
  3: styles.badgeTertiary,
};

function getInitials(name: string): string {
  const initials = name
    .replace(/[[\]]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return initials || '?';
}

function sortByTier(patrons: Patron[]): Patron[] {
  return [...patrons].sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));
}

export function PatronsWallSection({ patrons }: PatronsWallSectionProps) {
  const orderedPatrons = sortByTier(patrons);

  return (
    <section
      aria-labelledby="sciana-wspierajacych-heading"
      className={styles.section}
      id="sciana-wspierajacych"
    >
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Wsparcie klubu</p>
        <h2 className={styles.title} id="sciana-wspierajacych-heading">
          Ściana Wspierających
        </h2>
        <p className={styles.lead}>
          Wirtualna Ściana Wspierających to miejsce, w którym dziękujemy każdej osobie i firmie,
          która zdecydowała się pomóc naszemu klubowi. Nie ma tu wsparcia zbyt małego - liczy się
          każda złotówka i każdy gest. Dołączyć może każdy: kibic, rodzic, absolwent czy lokalna
          firma.
        </p>
      </div>

      <ul className={styles.feed}>
        {orderedPatrons.map((patron, index) => (
          <li className={styles.comment} key={`${patron.name}-${index}`}>
            <span aria-hidden="true" className={styles.avatar}>
              {getInitials(patron.name)}
            </span>
            <div className={styles.commentBody}>
              <div className={styles.commentHead}>
                <p className={styles.name}>{patron.name}</p>
                <span className={`${styles.badge} ${tierBadgeClassName[patron.tier]}`}>
                  {tierLabel[patron.tier]}
                </span>
              </div>
              {patron.message ? <p className={styles.message}>{patron.message}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
