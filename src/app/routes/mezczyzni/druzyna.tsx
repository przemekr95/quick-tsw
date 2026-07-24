import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { useTeamRoster } from '../../../shared/hooks/useTeamRoster';

export default function MezczyzniDruzynaRoute() {
  const { data, loading } = useTeamRoster('mezczyzni');

  if (loading) {
    return <p>Ładowanie składu...</p>;
  }

  return <TeamRoster players={data} />;
}
