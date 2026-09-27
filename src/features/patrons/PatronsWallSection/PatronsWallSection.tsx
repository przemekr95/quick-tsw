import type { Patron, PatronTier } from '../../../shared/types/domain';
import { ArrowLink } from '../../club-info/ArrowLink';
import styles from './PatronsWallSection.module.scss';

interface PatronsWallSectionProps {
  patrons: Patron[];
}

const tierOrder: PatronTier[] = [1, 2, 3];

const tierLabel: Record<PatronTier, string> = {
  1: 'Mecenasi',
  2: 'Darczyńcy',
  3: 'Przyjaciele Klubu',
};

const tierClassName: Record<PatronTier, string> = {
  1: styles.tierPrimary,
  2: styles.tierSecondary,
  3: styles.tierTertiary,
};

function groupByTier(patrons: Patron[]): Array<{ tier: PatronTier; patrons: Patron[] }> {
  return tierOrder
    .map((tier) => ({ tier, patrons: patrons.filter((patron) => patron.tier === tier) }))
    .filter((group) => group.patrons.length > 0);
}

export function PatronsWallSection({ patrons }: PatronsWallSectionProps) {
  const groups = groupByTier(patrons);

  return (
    <section aria-labelledby="przyjaciele-heading" className={styles.section} id="przyjaciele">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Wsparcie klubu</p>
        <h2 className={styles.title} id="przyjaciele-heading">
          Przyjaciele Białej Gwiazdy
        </h2>
        <p className={styles.lead}>
          Dziękujemy każdej osobie i firmie, która zdecydowała się pomóc naszemu klubowi. Nie ma tu
          wsparcia zbyt małego - liczy się każda złotówka i każdy gest.
        </p>
      </div>

      <div className={styles.ledger}>
        {groups.length === 0 ? (
          <p className={styles.empty}>Lista dopiero powstaje - pierwsze miejsce czeka na Ciebie.</p>
        ) : null}

        {groups.map((group) => (
          <div className={`${styles.row} ${tierClassName[group.tier]}`} key={group.tier}>
            <h3 className={styles.rowTitle} id={`patroni-poziom-${group.tier}`}>
              {tierLabel[group.tier]}
            </h3>
            <ul aria-labelledby={`patroni-poziom-${group.tier}`} className={styles.entries}>
              {group.patrons.map((patron, index) => (
                <li className={styles.entry} key={`${patron.name}-${index}`}>
                  <p className={styles.name}>{patron.name}</p>
                  {patron.message ? (
                    <p className={styles.message}>
                      <q>{patron.message}</q>
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Dołącz</h3>
          <div className={styles.join}>
            <p className={styles.joinText}>
              Dołączyć może każdy: kibic, rodzic, absolwent czy lokalna firma.
            </p>
            <ArrowLink to="../kontakt">Napisz do nas</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
