import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { usePatrons } from '../../../shared/hooks/usePatrons';

export default function MezczyzniStrefaPrzyjaciolRoute() {
  const { data: patrons, loading } = usePatrons('mezczyzni');

  if (loading) {
    return <p>Ładowanie strefy przyjaciół...</p>;
  }

  return <PatronsInfo patrons={patrons} />;
}
