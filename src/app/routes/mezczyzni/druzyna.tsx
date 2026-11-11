import { TeamRoster } from '../../../features/team-roster/TeamRoster';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { StructuredData } from '../../../shared/components/StructuredData';
import { useStaffRoster, useTeamRoster } from '../../../shared/hooks';
import { siteBaseUrl } from '../../../shared/utils/sitePages';
import { menTeamJsonLd } from '../../../shared/utils/structuredData';

export default function MezczyzniDruzynaRoute() {
  const players = useTeamRoster('mezczyzni');
  const staff = useStaffRoster('mezczyzni');

  // The player list is what the tab is for; without it there is nothing to show.
  if (players.error) {
    return (
      <ErrorState
        onRetry={() => {
          players.retry();
          if (staff.error) staff.retry();
        }}
      />
    );
  }

  if (players.loading || staff.loading) {
    return <LoadingState label="Ładowanie składu..." />;
  }

  const shownStaff = staff.error ? null : staff.data;

  return (
    <>
      <TeamRoster players={players.data} staff={shownStaff} />
      <StructuredData
        data={menTeamJsonLd(siteBaseUrl(), { players: players.data, staff: shownStaff ?? [] })}
      />
    </>
  );
}
