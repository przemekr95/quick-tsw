import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useStaffRoster, useTeamRoster } from '../../../shared/hooks';

export default function MezczyzniDruzynaRoute() {
  const { data: players, loading: playersLoading } = useTeamRoster('mezczyzni');
  const { data: staff, loading: staffLoading } = useStaffRoster('mezczyzni');

  if (playersLoading || staffLoading) {
    return <LoadingState label="Ładowanie składu..." />;
  }

  return <TeamRoster players={players} staff={staff} />;
}
