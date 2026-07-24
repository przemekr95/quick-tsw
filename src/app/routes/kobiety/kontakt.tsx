import { ContactInfo } from '../../../features/contact/ContactInfo';
import { useContactInfo } from '../../../shared/hooks/useContactInfo';

export default function KobietyKontaktRoute() {
  const { data, loading } = useContactInfo('kobiety');

  if (loading || !data) {
    return <p>Ładowanie kontaktu...</p>;
  }

  return <ContactInfo contact={data} />;
}
