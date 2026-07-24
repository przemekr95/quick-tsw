import { NavLink } from 'react-router-dom';
import { FACEBOOK_NEWS_URL } from '../../utils/config';
import styles from './TabsNav.module.scss';

interface TabsNavProps {
  sectionPath: '/kobiety' | '/mezczyzni';
}

export function TabsNav({ sectionPath }: TabsNavProps) {
  return (
    <nav aria-label="Nawigacja sekcji" className={styles.nav}>
      <NavLink className={styles.link} to={`${sectionPath}/klub`}>
        Klub
      </NavLink>
      <NavLink className={styles.link} to={`${sectionPath}/druzyna`}>
        Drużyna
      </NavLink>
      <NavLink className={styles.link} to={`${sectionPath}/kontakt`}>
        Kontakt
      </NavLink>
      <a className={styles.link} href={FACEBOOK_NEWS_URL} rel="noopener noreferrer" target="_blank">
        Aktualności
      </a>
    </nav>
  );
}
