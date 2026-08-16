import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { useStaffRoster } from '../../../shared/hooks/useStaffRoster';
import { useTeamRoster } from '../../../shared/hooks/useTeamRoster';

export default function MezczyzniDruzynaRoute() {
  const { data: players, loading: playersLoading } = useTeamRoster('mezczyzni');
  const { data: staff, loading: staffLoading } = useStaffRoster('mezczyzni');

  if (playersLoading || staffLoading) {
    return <p>Ładowanie składu...</p>;
  }

  return <TeamRoster players={players} staff={staff} />;
}
