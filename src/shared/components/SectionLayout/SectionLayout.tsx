import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HeroBackground } from '../HeroBackground';
import { HeroCtaButton } from '../HeroCtaButton';
import { NavBar } from '../NavBar';
import styles from './SectionLayout.module.scss';

interface SectionLayoutProps extends PropsWithChildren {
  sectionLabel: string;
  sectionPath: '/kobiety' | '/mezczyzni';
}

export function SectionLayout({ children, sectionLabel, sectionPath }: SectionLayoutProps) {
  const { pathname } = useLocation();
  const isSectionHome = pathname === `${sectionPath}/klub` || pathname === sectionPath;

  return (
    <div className={styles.page}>
      {isSectionHome ? (
        <HeroBackground sectionLabel={sectionLabel}>
          <header className={styles.header}>
            <NavBar sectionLabel={sectionLabel} sectionPath={sectionPath} />
          </header>
          <div className={styles.ctaWrap}>
            <HeroCtaButton label="Przejdź do treści" targetId="section-content" />
          </div>
        </HeroBackground>
      ) : (
        <header className={styles.headerInline}>
          <NavBar sectionLabel={sectionLabel} sectionPath={sectionPath} />
        </header>
      )}
      <main className={styles.main} id="section-content" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Link className={styles.backLink} to="/">
          Powrót do wyboru sekcji
        </Link>
      </footer>
    </div>
  );
}
