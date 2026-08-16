import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { useStaffRoster } from '../../../shared/hooks/useStaffRoster';
import { useTeamRoster } from '../../../shared/hooks/useTeamRoster';

export default function KobietyDruzynaRoute() {
  const { data: players, loading: playersLoading } = useTeamRoster('kobiety');
  const { data: staff, loading: staffLoading } = useStaffRoster('kobiety');

  if (playersLoading || staffLoading) {
    return <p>Ładowanie składu...</p>;
  }

  return <TeamRoster players={players} staff={staff} />;
}
