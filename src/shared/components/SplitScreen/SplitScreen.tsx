import { Link } from 'react-router-dom';
import styles from './SplitScreen.module.scss';

export function SplitScreen() {
  return (
    <main className={styles.root} aria-label="Wybierz sekcję klubu">
      <Link className={styles.panel} data-variant="kobiety" to="/kobiety">
        <span className={styles.label}>Kobiety</span>
      </Link>
      <Link className={styles.panel} data-variant="mezczyzni" to="/mezczyzni">
        <span className={styles.label}>Mężczyźni</span>
      </Link>
    </main>
  );
}
