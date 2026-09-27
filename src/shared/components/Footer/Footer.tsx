import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import type { SectionPath } from '../../types/domain';
import {
  CLUB_BRAND_NAME,
  FACEBOOK_NEWS_URL,
  FOOTER_LINKS,
  INSTAGRAM_URL,
} from '../../utils/config';
import styles from './Footer.module.scss';

interface FooterProps {
  sectionName: string;
  sectionPath: SectionPath;
}

function FacebookIcon() {
  return <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
}

function InstagramIcon() {
  return (
    <>
      <rect height="18.5" rx="5.25" width="18.5" x="2.75" y="2.75" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.35" cy="6.65" fill="currentColor" r="0.9" stroke="none" />
    </>
  );
}

const SOCIAL_LINKS: Array<{ label: string; href: string; icon: ReactNode }> = [
  { label: 'Facebook', href: FACEBOOK_NEWS_URL, icon: <FacebookIcon /> },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: <InstagramIcon /> },
];

export function Footer({ sectionName, sectionPath }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.sectionName}>{sectionName}</p>

          <div className={styles.actions}>
            <nav aria-label="Nawigacja w stopce">
              <ul className={styles.linkList}>
                {FOOTER_LINKS.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                      }
                      to={`${sectionPath}/${link.path}`}
                    >
                      <span className={styles.label}>{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <ul aria-label="Media społecznościowe" className={styles.socialList}>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    className={styles.socialLink}
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      className={styles.socialIcon}
                      fill="none"
                      focusable="false"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                    <span className={styles.srOnly}>
                      {social.label} (otwiera się w nowej karcie)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.copyright}>
          © {currentYear} {CLUB_BRAND_NAME}
        </p>
      </div>
    </footer>
  );
}
