import { Link } from 'react-router-dom';
import styles from './SplitScreen.module.scss';

export function SplitScreen() {
  return (
    <main className={styles.root} aria-label="Wybierz sekcję klubu">
      <Link className={styles.panel} data-variant="kobiety" to="/kobiety">
        <span aria-hidden="true" className={styles.scrim} />
        <span aria-hidden="true" className={styles.eyebrow}>
          Sekcja siatkówki
        </span>
        <span className={styles.label}>Kobiet</span>
        <span aria-hidden="true" className={styles.cta}>
          Poznaj sekcję
          <span className={styles.arrow}>→</span>
        </span>
      </Link>

      <div aria-hidden="true" className={styles.crestGlow} />
      <div aria-hidden="true" className={styles.divider} />
      <div aria-hidden="true" className={styles.crest}>
        <img alt="" className={styles.crestImage} src="/tsw-herb.png" />
      </div>

      <Link className={styles.panel} data-variant="mezczyzni" to="/mezczyzni">
        <span aria-hidden="true" className={styles.scrim} />
        <span aria-hidden="true" className={styles.eyebrow}>
          Sekcja siatkówki
        </span>
        <span className={styles.label}>Mężczyzn</span>
        <span aria-hidden="true" className={styles.cta}>
          Poznaj sekcję
          <span className={styles.arrow}>→</span>
        </span>
      </Link>
    </main>
  );
}
