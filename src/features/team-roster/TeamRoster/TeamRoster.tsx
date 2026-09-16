import type { Player, StaffMember } from '../../../shared/types/domain';
import { PlayersSection } from '../PlayersSection';
import { StaffSection } from '../StaffSection';
import { TeamPhotoSection } from '../TeamPhotoSection';
import styles from './TeamRoster.module.scss';

interface TeamRosterProps {
  players: Player[];
  staff: StaffMember[];
}

export function TeamRoster({ players, staff }: TeamRosterProps) {
  return (
    <section aria-label="Zakładka Drużyna" className={styles.root}>
      <div className={styles.stack}>
        <TeamPhotoSection />
        <PlayersSection players={players} />
        <StaffSection staff={staff} />
      </div>
    </section>
  );
}
