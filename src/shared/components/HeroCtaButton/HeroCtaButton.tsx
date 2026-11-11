import { Link, resolvePath } from 'react-router-dom';
import styles from './HeroCtaButton.module.scss';

interface HeroCtaButtonProps {
  href: string;
  label: string;
  // The page URL that relative slide hrefs (e.g. ../kontakt) are written against.
  relativeTo: string;
}

function isExternalHref(href: string): boolean {
  return /^(?:https?:)?\/\//iu.test(href);
}

function isNonRouteHref(href: string): boolean {
  return href.startsWith('#') || /^[a-z][a-z0-9+.-]*:/iu.test(href);
}

function CtaContent({ label }: { label: string }) {
  return (
    <>
      <span className={styles.ctaText}>{label}</span>
      <span aria-hidden="true" className={styles.ctaArrow}>
        <svg
          className={styles.ctaArrowSvg}
          fill="none"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.arrowRing}
            cx="16"
            cy="16"
            r="14.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M13 10.5l5.5 5.5-5.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
    </>
  );
}

export function HeroCtaButton({ href, label, relativeTo }: HeroCtaButtonProps) {
  if (isExternalHref(href)) {
    return (
      <a className={styles.ctaButton} href={href} rel="noopener noreferrer" target="_blank">
        <CtaContent label={label} />
      </a>
    );
  }

  if (isNonRouteHref(href)) {
    return (
      <a className={styles.ctaButton} href={href}>
        <CtaContent label={label} />
      </a>
    );
  }

  // The button renders in the section layout route, so a plain <Link> would
  // resolve ../kontakt from /mezczyzni and drop the section prefix.
  return (
    <Link className={styles.ctaButton} to={resolvePath(href, relativeTo)}>
      <CtaContent label={label} />
    </Link>
  );
}
