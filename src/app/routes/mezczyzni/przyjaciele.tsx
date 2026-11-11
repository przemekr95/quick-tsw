import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { usePatrons } from '../../../shared/hooks';

export default function MezczyzniPrzyjacieleRoute() {
  const { data: patrons, loading, error, retry } = usePatrons('mezczyzni');

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  if (loading) {
    return <LoadingState label="Ładowanie listy przyjaciół..." />;
  }

  return <PatronsInfo patrons={patrons} />;
}
