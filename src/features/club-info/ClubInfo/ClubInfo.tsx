import { useMemo } from 'react';
import type {
  Club,
  ClubLandingContent,
  Player,
  SectionId,
  StandingsRow,
  UpcomingMatch,
} from '../../../shared/types/domain';
import { PartialDataNotice } from '../../../shared/components/PartialDataNotice';
import { StructuredData } from '../../../shared/components/StructuredData';
import { useSeasonSchedule } from '../../../shared/hooks';
import { getRecentResults } from '../../../shared/utils/matchSchedule';
import { pickRandomItems } from '../../../shared/utils/random';
import { siteBaseUrl } from '../../../shared/utils/sitePages';
import { nextMatchJsonLd } from '../../../shared/utils/structuredData';
import { AboutSection } from '../AboutSection';
import { JoinSection } from '../JoinSection';
import { NextMatchSection } from '../NextMatchSection';
import { RecentResultsSection } from '../RecentResultsSection';
import { RosterSection } from '../RosterSection';
import { StandingsSection } from '../StandingsSection';
import { UpcomingMatchesSection } from '../UpcomingMatchesSection';
import styles from './ClubInfo.module.scss';

const ROSTER_PREVIEW_SIZE = 4;

// `null` means the request for that data failed: the sections built from it
// are left out, and a notice with a retry button takes their place.
interface ClubInfoProps {
  club: Pick<Club, 'name' | 'history'>;
  landingContent: ClubLandingContent;
  players: Player[] | null;
  matches: UpcomingMatch[] | null;
  standings: StandingsRow[] | null;
  section: SectionId;
  onRetry: () => void;
}

function joinWithAnd(items: string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} i ${items.at(-1)}`;
}

function missingDataMessage({ players, matches, standings }: ClubInfoProps): string | null {
  const missing = [
    players === null && 'składu drużyny',
    matches === null && 'meczów',
    standings === null && 'tabeli ligowej',
  ].filter((item): item is string => item !== false);

  return missing.length > 0 ? `Nie udało się wczytać ${joinWithAnd(missing)}.` : null;
}

const aboutImageBySection: Record<SectionId, { src: string; alt: string }> = {
  mezczyzni: {
    src: '/images/backgrounds/hero-m.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji',
  },
};

const historyUrlBySection: Record<SectionId, string> = {
  mezczyzni: 'https://historiawisly.pl/wiki/index.php?title=Pi%C5%82ka_siatkowa_m%C4%99%C5%BCczyzn',
};

export function ClubInfo(props: ClubInfoProps) {
  const { club, landingContent, players, matches, standings, section, onRetry } = props;
  const aboutImage = aboutImageBySection[section];
  const rosterPreview = useMemo(
    () => pickRandomItems(players ?? [], ROSTER_PREVIEW_SIZE),
    [players],
  );
  const schedule = useSeasonSchedule(matches);
  const [nextMatch, ...remainingMatches] = schedule;
  const recentResults = useMemo(() => getRecentResults(matches ?? []), [matches]);
  const nextMatchEvent = nextMatchJsonLd(siteBaseUrl(), nextMatch);
  const missingMessage = missingDataMessage(props);

  return (
    <section aria-label="Zakładka Klub" className={styles.root}>
      <div className={styles.stack}>
        <div className={styles.introGroup}>
          <AboutSection
            clubName={club.name}
            history={club.history}
            historyUrl={historyUrlBySection[section]}
            imageAlt={aboutImage.alt}
            imageSrc={aboutImage.src}
          />

          {players && <RosterSection players={rosterPreview} />}

          <JoinSection recruitmentPaths={landingContent.recruitmentPaths} />
        </div>

        {missingMessage && <PartialDataNotice message={missingMessage} onRetry={onRetry} />}

        {matches && (
          <>
            {nextMatch && <NextMatchSection form={landingContent.matchForm} match={nextMatch} />}
            {nextMatchEvent && <StructuredData data={nextMatchEvent} />}

            <UpcomingMatchesSection matches={remainingMatches} />

            <RecentResultsSection results={recentResults} />
          </>
        )}

        {standings && <StandingsSection standings={standings} />}
      </div>
    </section>
  );
}
