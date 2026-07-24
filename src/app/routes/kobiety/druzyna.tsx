import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { useTeamRoster } from '../../../shared/hooks/useTeamRoster';

export default function KobietyDruzynaRoute() {
  const { data, loading } = useTeamRoster('kobiety');

  if (loading) {
    return <p>Ładowanie składu...</p>;
  }

  return <TeamRoster players={data} />;
}
