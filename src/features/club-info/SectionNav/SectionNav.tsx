import styles from './SectionNav.module.scss';

const anchors = [
  { id: 'o-klubie', label: 'O klubie' },
  { id: 'nasza-druzyna', label: 'Nasza drużyna' },
  { id: 'dolacz-do-nas', label: 'Dołącz do nas' },
  { id: 'najblizszy-mecz', label: 'Najbliższy mecz' },
] as const;

export function SectionNav() {
  return (
    <nav aria-label="Nawigacja sekcji klubu" className={styles.nav}>
      <ul className={styles.list}>
        {anchors.map((anchor) => (
          <li key={anchor.id}>
            <a className={styles.link} href={`#${anchor.id}`}>
              {anchor.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
