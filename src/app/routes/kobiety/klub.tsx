import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubData } from '../../../shared/hooks/useClubData';

export default function KobietyKlubRoute() {
  const { data, loading } = useClubData('kobiety');

  if (loading || !data) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return <ClubInfo club={data} />;
}
