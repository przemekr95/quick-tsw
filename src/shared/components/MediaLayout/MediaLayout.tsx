import type { PropsWithChildren } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import styles from './MediaLayout.module.scss';

export function MediaLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.page} data-theme="media">
      <header className={styles.headerInline}>
        <NavBar />
      </header>

      <main className={styles.main} id="section-content" tabIndex={-1}>
        <div className={styles.mainInner}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}
