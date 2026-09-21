import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useSectionOutletContext, useTeamRoster } from '../../../shared/hooks';

export default function MezczyzniKlubRoute() {
  const { club, landingContent } = useSectionOutletContext();
  const { data: players, loading: playersLoading } = useTeamRoster('mezczyzni');

  if (playersLoading || !club || !landingContent) {
    return <LoadingState label="Ładowanie danych klubu..." />;
  }

  return (
    <ClubInfo club={club} landingContent={landingContent} players={players} section="mezczyzni" />
  );
}
