import type { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const heroCopy =
    sectionPath === '/mezczyzni'
      ? {
          eyebrow: 'Nasza drużyna',
          title: 'Siła w każdym secie.',
          text: 'Walczymy na najwyższym poziomie w każdym meczu.',
          cta: 'Poznaj drużynę',
        }
      : {
          eyebrow: `Sekcja ${sectionLabel}`,
          title: sectionLabel,
          text: 'Odkryj klub, zespół i najważniejsze informacje w jednym miejscu.',
          cta: 'Przejdź do treści',
        };

  return (
    <div className={styles.page}>
      {isSectionHome ? (
        <HeroBackground sectionLabel={sectionLabel} sectionPath={sectionPath}>
          <div className={styles.heroInner}>
            <header className={styles.header}>
              <NavBar sectionPath={sectionPath} />
            </header>

            <div className={styles.heroContent}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{heroCopy.eyebrow}</p>
                <h1 className={styles.heroTitle}>{heroCopy.title}</h1>
                <p className={styles.heroText}>{heroCopy.text}</p>
              </div>

              <div className={styles.heroActions}>
                <HeroCtaButton label={heroCopy.cta} targetId="section-content" />
              </div>
            </div>
          </div>
        </HeroBackground>
      ) : (
        <header className={styles.headerInline}>
          <NavBar sectionPath={sectionPath} />
        </header>
      )}

      <main className={styles.main} id="section-content" tabIndex={-1}>
        <div className={styles.mainInner}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <Link className={styles.backLink} to="/">
          Powrót do wyboru sekcji
        </Link>
      </footer>
    </div>
  );
}
