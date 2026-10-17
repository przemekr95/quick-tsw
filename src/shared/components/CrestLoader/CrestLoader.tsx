import { CLUB_CREST_SRC } from '../../utils/config';
import styles from './CrestLoader.module.scss';

export function CrestLoader() {
  return (
    <div aria-hidden="true" className={styles.root}>
      <div className={styles.glow} />
      <div className={styles.crest}>
        <img alt="" className={styles.image} src={CLUB_CREST_SRC} />
      </div>
    </div>
  );
}
