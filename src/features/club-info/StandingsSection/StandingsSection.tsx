import type { StandingsRow } from '../../../shared/types/domain';
import styles from './StandingsSection.module.scss';

interface StandingsSectionProps {
  standings: StandingsRow[];
}

export function StandingsSection({ standings }: StandingsSectionProps) {
  return (
    <section aria-labelledby="tabela-ligowa-heading" className={styles.section} id="tabela-ligowa">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Klasyfikacja</p>
        <h2 className={styles.title} id="tabela-ligowa-heading">
          Tabela ligowa
        </h2>
      </div>

      {standings.length === 0 ? (
        <p className={styles.empty}>Tabela ligowa pojawi się po rozpoczęciu sezonu.</p>
      ) : (
        <div
          aria-label="Wiersze tabeli ligowej"
          className={styles.tableScroll}
          role="region"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard-focusable scroll region (WCAG SCR29)
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.position} scope="col">
                  Lp.
                </th>
                <th className={styles.team} scope="col">
                  Drużyna
                </th>
                <th className={styles.stat} scope="col">
                  M
                </th>
                <th className={styles.stat} scope="col">
                  Bilans
                </th>
                <th className={styles.stat} scope="col">
                  Sety
                </th>
                <th className={styles.stat} scope="col">
                  Pkt
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr className={row.isOwnTeam ? styles.ownTeam : undefined} key={row.team}>
                  <th className={styles.position} scope="row">
                    {row.position}
                  </th>
                  <td className={styles.team}>{row.team}</td>
                  <td className={styles.stat}>{row.played}</td>
                  <td className={styles.stat}>
                    {row.wins}-{row.losses}
                  </td>
                  <td className={styles.stat}>
                    {row.setsWon}:{row.setsLost}
                  </td>
                  <td className={styles.points}>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
