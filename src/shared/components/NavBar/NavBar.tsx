import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMenuFocusTrap } from '../../hooks';
import { FACEBOOK_NEWS_URL } from '../../utils/config';
import styles from './NavBar.module.scss';

const SECTION_LINKS = [
  { label: 'Klub', path: 'klub' },
  { label: 'Drużyna', path: 'druzyna' },
  { label: 'Kontakt', path: 'kontakt' },
] as const;

function joinClasses(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ');
}

interface NavBarProps {
  sectionPath: '/kobiety' | '/mezczyzni';
}

export function NavBar({ sectionPath }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useMenuFocusTrap({
    isOpen: isMenuOpen,
    menuRef,
    primaryRef: buttonRef,
    secondaryRef: brandRef,
    onClose: closeMenu,
  });

  useEffect(() => {
    if (!isMenuOpen || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const desktopMediaQuery = window.matchMedia('(min-width: 880px)');

    if (desktopMediaQuery.matches) {
      setIsMenuOpen(false);
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener('change', handleChange);

    return () => {
      desktopMediaQuery.removeEventListener('change', handleChange);
    };
  }, [isMenuOpen]);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    joinClasses(styles.link, isActive && styles.activeLink);

  const renderSectionLinks = () =>
    SECTION_LINKS.map((link) => (
      <NavLink
        key={link.path}
        className={navLinkClassName}
        onClick={closeMenu}
        to={`${sectionPath}/${link.path}`}
      >
        {link.label}
      </NavLink>
    ));

  return (
    <div className={styles.header}>
      {isMenuOpen ? (
        <button aria-label="Zamknij menu" className={styles.backdrop} onClick={closeMenu} type="button" />
      ) : null}

      <div
        aria-label={isMenuOpen ? 'Menu nawigacyjne' : undefined}
        aria-modal={isMenuOpen ? 'true' : undefined}
        className={joinClasses(styles.modalShell, isMenuOpen && styles.modalShellOpen)}
        role={isMenuOpen ? 'dialog' : undefined}
      >
        <nav aria-label="Nawigacja" className={styles.nav}>
          <Link
            aria-label="Towarzystwo Sportowe Wisła Kraków"
            className={styles.brand}
            onClick={closeMenu}
            ref={brandRef}
            to="/"
          >
            <span aria-hidden="true" className={styles.brandMark}>
              <img alt="" className={styles.brandLogo} src="/tsw-herb.png" />
            </span>
          </Link>

          <div className={styles.desktopLinks}>
            {renderSectionLinks()}
            <a
              aria-label="Aktualności na Facebooku"
              className={styles.link}
              href={FACEBOOK_NEWS_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Aktualności
            </a>
          </div>

          <button
            aria-controls="section-nav-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            className={styles.toggle}
            data-state={isMenuOpen ? 'open' : 'closed'}
            onClick={() => setIsMenuOpen((value) => !value)}
            ref={buttonRef}
            type="button"
          >
            <span className={styles.toggleLines} />
          </button>
        </nav>

        <ul
          aria-hidden={!isMenuOpen}
          className={joinClasses(styles.menu, isMenuOpen && styles.menuOpen)}
          hidden={!isMenuOpen}
          id="section-nav-menu"
          ref={menuRef}
          tabIndex={-1}
        >
          <li>
            <a
              aria-label="Aktualności na Facebooku"
              className={styles.link}
              href={FACEBOOK_NEWS_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Aktualności
            </a>
          </li>
          {SECTION_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink className={navLinkClassName} onClick={closeMenu} to={`${sectionPath}/${link.path}`}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
