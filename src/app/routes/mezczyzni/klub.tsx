import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubLandingContent } from '../../../shared/hooks/useClubLandingContent';
import { useSectionOutletContext } from '../../../shared/hooks/useSectionOutletContext';
import { useTeamRoster } from '../../../shared/hooks/useTeamRoster';

export default function MezczyzniKlubRoute() {
  const { club } = useSectionOutletContext();
  const { data: landingContent, loading: landingLoading } = useClubLandingContent('mezczyzni');
  const { data: players, loading: playersLoading } = useTeamRoster('mezczyzni');

  if (landingLoading || playersLoading || !club || !landingContent) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return (
    <ClubInfo club={club} landingContent={landingContent} players={players} section="mezczyzni" />
  );
}
