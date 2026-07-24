import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubData } from '../../../shared/hooks/useClubData';

export default function MezczyzniKlubRoute() {
  const { data, loading } = useClubData('mezczyzni');

  if (loading || !data) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return <ClubInfo club={data} />;
}
