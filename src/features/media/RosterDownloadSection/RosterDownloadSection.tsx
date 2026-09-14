import { MEDIA_DOWNLOADS } from '../../../shared/utils/config';
import { DownloadLink } from '../DownloadLink';
import styles from './RosterDownloadSection.module.scss';

const ROSTER_DOWNLOADS = [
  {
    id: 'mezczyzni',
    label: 'Mężczyźni',
    description: 'Aktualny skład zawodników sekcji męskiej w formacie PDF.',
    href: MEDIA_DOWNLOADS.rosterMezczyzni,
  },
] as const;

export function RosterDownloadSection() {
  return (
    <section
      aria-labelledby="sklady-zawodnikow-heading"
      className={styles.section}
      id="sklady-zawodnikow"
    >
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Do pobrania</p>
        <h2 className={styles.title} id="sklady-zawodnikow-heading">
          Składy zawodników
        </h2>
      </div>

      <ul className={styles.grid}>
        {ROSTER_DOWNLOADS.map((roster) => (
          <li className={styles.cell} key={roster.id}>
            <p className={styles.label}>{roster.label}</p>
            <p className={styles.description}>{roster.description}</p>
            <DownloadLink href={roster.href}>{`Pobierz skład - ${roster.label}`}</DownloadLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
