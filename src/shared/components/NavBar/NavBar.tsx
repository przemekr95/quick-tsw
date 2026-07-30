import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FACEBOOK_NEWS_URL } from '../../utils/config';
import styles from './NavBar.module.scss';

interface NavBarProps {
  sectionPath: '/kobiety' | '/mezczyzni';
  sectionLabel: string;
}

export function NavBar({ sectionPath, sectionLabel }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClassName = [styles.menu, isMenuOpen ? styles.menuOpen : ''].join(' ').trim();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [styles.link, isActive ? styles.activeLink : ''].join(' ').trim();

  return (
    <nav aria-label="Nawigacja sekcji" className={styles.nav}>
      <Link
        aria-label={`Volterra VC — ${sectionLabel}`}
        className={styles.brand}
        onClick={closeMenu}
        to={`${sectionPath}/klub`}
      >

      <button
        aria-controls="section-nav-menu"
        aria-expanded={isMenuOpen}
        aria-label="Przełącz menu nawigacyjne"
        className={styles.toggle}
        onClick={() => setIsMenuOpen((value) => !value)}
        type="button"
      >
        <span className={styles.toggleLines} />
      </button>

      <ul className={menuClassName} id="section-nav-menu">
        <li>
          <a
            className={styles.link}
            href={FACEBOOK_NEWS_URL}
            aria-label="Aktualności na Facebooku"
            rel="noopener noreferrer"
            target="_blank"
          >
            Aktualności
          </a>
        </li>
        <li>
          <NavLink className={navLinkClassName} onClick={closeMenu} to={`${sectionPath}/klub`}>
            Klub
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} onClick={closeMenu} to={`${sectionPath}/druzyna`}>
            Drużyna
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} onClick={closeMenu} to={`${sectionPath}/kontakt`}>
            Kontakt
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
