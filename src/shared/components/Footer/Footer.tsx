import { Link, NavLink } from 'react-router-dom';
import type { SectionPath } from '../../types/domain';
import { CLUB_BRAND_NAME, CLUB_CREST_SRC, FACEBOOK_NEWS_URL, SECTION_TAB_LINKS } from '../../utils/config';
import styles from './Footer.module.scss';

interface FooterProps {
  sectionPath: SectionPath;
}

export function Footer({ sectionPath }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img alt="" aria-hidden="true" className={styles.crest} src={CLUB_CREST_SRC} />

        <nav aria-label="Nawigacja sekcji klubu" className={styles.nav}>
          <ul className={styles.navList}>
            {SECTION_TAB_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
                  to={`${sectionPath}/${link.path}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                aria-label="Aktualności na Facebooku"
                className={styles.navLink}
                href={FACEBOOK_NEWS_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Aktualności
              </a>
            </li>
          </ul>
        </nav>

        <Link className={styles.backLink} to="/">
          <span aria-hidden="true" className={styles.backArrow}>
            ←
          </span>
          Powrót do wyboru sekcji
        </Link>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© {currentYear} {CLUB_BRAND_NAME}. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
