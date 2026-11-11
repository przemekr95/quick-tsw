import { MAIN_CONTENT_ID } from '../../utils/config';
import styles from './RetryButton.module.scss';

interface RetryButtonProps {
  onRetry: () => void;
}

export function RetryButton({ onRetry }: RetryButtonProps) {
  function handleClick() {
    onRetry();
    // The button disappears while the data loads again; keep keyboard and
    // screen-reader focus in the page content instead of losing it to <body>.
    document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true });
  }

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      Spróbuj ponownie
    </button>
  );
}
