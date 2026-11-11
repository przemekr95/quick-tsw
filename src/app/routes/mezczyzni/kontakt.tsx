import { ContactInfo } from '../../../features/contact/ContactInfo';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { StructuredData } from '../../../shared/components/StructuredData';
import { useContactInfo } from '../../../shared/hooks';
import { siteBaseUrl } from '../../../shared/utils/sitePages';
import { menTeamJsonLd } from '../../../shared/utils/structuredData';

export default function MezczyzniKontaktRoute() {
  const { data, loading, error, retry } = useContactInfo('mezczyzni');

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  if (loading || !data) {
    return <LoadingState label="Ładowanie kontaktu..." />;
  }

  return (
    <>
      <ContactInfo contact={data} />
      <StructuredData data={menTeamJsonLd(siteBaseUrl(), { contact: data })} />
    </>
  );
}
