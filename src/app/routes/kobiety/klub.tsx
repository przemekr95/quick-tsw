import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubLandingContent } from '../../../shared/hooks/useClubLandingContent';
import { useSectionOutletContext } from '../../../shared/hooks/useSectionOutletContext';

export default function KobietyKlubRoute() {
  const { club } = useSectionOutletContext();
  const { data: landingContent, loading: landingLoading } = useClubLandingContent('kobiety');

  if (landingLoading || !club || !landingContent) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return <ClubInfo club={club} landingContent={landingContent} section="kobiety" />;
}
