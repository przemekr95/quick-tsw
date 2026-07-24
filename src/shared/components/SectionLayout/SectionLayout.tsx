import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { TabsNav } from '../TabsNav';
import styles from './SectionLayout.module.scss';

interface SectionLayoutProps extends PropsWithChildren {
  sectionLabel: string;
  sectionPath: '/kobiety' | '/mezczyzni';
}

export function SectionLayout({ children, sectionLabel, sectionPath }: SectionLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Klub Siatkarski</p>
        <h1 className={styles.title}>{sectionLabel}</h1>
        <TabsNav sectionPath={sectionPath} />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Link className={styles['back-link']} to="/">
          Powrót do wyboru sekcji
        </Link>
      </footer>
    </div>
  );
}
