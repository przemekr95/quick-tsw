import styles from './DownloadLink.module.scss';

interface DownloadLinkProps {
  href: string;
  children: string;
}

export function DownloadLink({ href, children }: DownloadLinkProps) {
  return (
    <a className={styles.link} download href={href}>
      {children}
      <span aria-hidden="true" className={styles.icon}>
        ↓
      </span>
    </a>
  );
}
