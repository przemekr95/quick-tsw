import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useSectionOutletContext, useTeamRoster, useUpcomingMatches } from '../../../shared/hooks';

export default function MezczyzniKlubRoute() {
  const { club, landingContent } = useSectionOutletContext();
  const { data: players, loading: playersLoading } = useTeamRoster('mezczyzni');
  const { data: matches, loading: matchesLoading } = useUpcomingMatches('mezczyzni');

  if (playersLoading || matchesLoading || !club || !landingContent) {
    return <LoadingState label="Ładowanie danych klubu..." />;
  }

  return (
    <ClubInfo
      club={club}
      landingContent={landingContent}
      matches={matches}
      players={players}
      section="mezczyzni"
    />
  );
}
