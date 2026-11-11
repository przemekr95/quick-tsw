import type { Player, StaffMember } from '../../../shared/types/domain';
import { RosterDownloadSection } from '../../media/RosterDownloadSection';
import { PlayersSection } from '../PlayersSection';
import { StaffSection } from '../StaffSection';
import { TeamPhotoSection } from '../TeamPhotoSection';
import styles from './TeamRoster.module.scss';

interface TeamRosterProps {
  players: Player[];
  // `null` when the staff request failed: the section is left out.
  staff: StaffMember[] | null;
}

export function TeamRoster({ players, staff }: TeamRosterProps) {
  return (
    <section aria-label="Zakładka Drużyna" className={styles.root}>
      <div className={styles.stack}>
        <TeamPhotoSection />
        <PlayersSection players={players} />
        {staff && <StaffSection staff={staff} />}
        <RosterDownloadSection />
      </div>
    </section>
  );
}
