import { RetryButton } from '../RetryButton';
import styles from './PartialDataNotice.module.scss';

interface PartialDataNoticeProps {
  message: string;
  onRetry: () => void;
}

// Stands in for the sections whose data failed to load, while the rest of
// the tab stays usable.
export function PartialDataNotice({ message, onRetry }: PartialDataNoticeProps) {
  return (
    <section aria-label="Brakujące dane" className={styles.section}>
      <p className={styles.message} role="alert">
        {message}
      </p>
      <RetryButton onRetry={onRetry} />
    </section>
  );
}
