import { CrestLoader } from '../CrestLoader';
import styles from './LoadingState.module.scss';

interface LoadingStateProps {
  label: string;
  // Mirrors `dsr.root($with-nav-offset)`: false on the hero-headed Klub tab,
  // where the content does not slide up under the inline header.
  withNavOffset?: boolean;
}

export function LoadingState({ label, withNavOffset = true }: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      className={withNavOffset ? styles.root : styles.rootFlush}
      role="status"
    >
      <CrestLoader />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
