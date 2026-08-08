import styles from './HeroCtaButton.module.scss';

interface HeroCtaButtonProps {
  targetId: string;
  label: string;
}

export function HeroCtaButton({ targetId, label }: HeroCtaButtonProps) {
  return (
    <a className={styles.ctaButton} href={`#${targetId}`}>
      <span className={styles.ctaText}>{label}</span>
      <span aria-hidden="true" className={styles.ctaArrow}>
        <svg className={styles.ctaArrowSvg} fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle className={styles.arrowRing} cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 10.5l5.5 5.5-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </span>
    </a>
  );
}
