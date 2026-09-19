import styles from './LoadingState.module.scss';

interface LoadingStateProps {
  label: string;
}

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <p aria-live="polite" className={styles.root} role="status">
      {label}
    </p>
  );
}
