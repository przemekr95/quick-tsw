import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { usePatrons } from '../../../shared/hooks/usePatrons';

export default function KobietyStrefaPrzyjaciolRoute() {
  const { data: patrons, loading } = usePatrons('kobiety');

  if (loading) {
    return <p>Ładowanie strefy przyjaciół...</p>;
  }

  return <PatronsInfo patrons={patrons} />;
}
