import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { StructuredData } from '../../../shared/components/StructuredData';
import {
  useSectionOutletContext,
  useStandings,
  useTeamRoster,
  useUpcomingMatches,
} from '../../../shared/hooks';
import { siteBaseUrl } from '../../../shared/utils/sitePages';
import { menTeamJsonLd } from '../../../shared/utils/structuredData';

export default function MezczyzniKlubRoute() {
  const { club, landingContent, loadError, retryLoad } = useSectionOutletContext();
  const players = useTeamRoster('mezczyzni');
  const matches = useUpcomingMatches('mezczyzni');
  const standings = useStandings('mezczyzni');

  if (loadError) {
    return <ErrorState onRetry={retryLoad} withNavOffset={false} />;
  }

  if (players.loading || matches.loading || standings.loading || !club || !landingContent) {
    return <LoadingState label="Ładowanie danych klubu..." withNavOffset={false} />;
  }

  return (
    <>
      <ClubInfo
        club={club}
        landingContent={landingContent}
        matches={matches.error ? null : matches.data}
        onRetry={() => {
          for (const source of [players, matches, standings]) {
            if (source.error) source.retry();
          }
        }}
        players={players.error ? null : players.data}
        section="mezczyzni"
        standings={standings.error ? null : standings.data}
      />
      <StructuredData data={menTeamJsonLd(siteBaseUrl())} />
    </>
  );
}
