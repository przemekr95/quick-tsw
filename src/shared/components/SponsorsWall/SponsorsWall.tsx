import type { Sponsor, SponsorTier } from '../../../shared/types/domain';
import styles from './SponsorsWall.module.scss';

interface SponsorsWallProps {
  sponsors: Sponsor[];
}

const TIERS: SponsorTier[] = [1, 2, 3];

const tierRowClassName: Record<SponsorTier, string> = {
  1: styles.tierRowPrimary,
  2: styles.tierRowSecondary,
  3: styles.tierRowTertiary,
};

function normalizeSponsorName(name: string) {
  return name.replace(/\[|\]/g, '').trim();
}

function getSponsorMeta(sponsor: Sponsor) {
  const name = normalizeSponsorName(sponsor.name);
  const rawWebsiteUrl = sponsor.websiteUrl?.trim() ?? '';
  const websiteUrl = /^https?:\/\//iu.test(rawWebsiteUrl) ? rawWebsiteUrl : '';

  return {
    name,
    tier: sponsor.tier,
    logoSrc: sponsor.logoSrc?.trim() ?? '',
    websiteUrl,
  };
}

function getSponsorCode(name: string) {
  return normalizeSponsorName(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SponsorsWall({ sponsors }: SponsorsWallProps) {
  const normalizedSponsors = sponsors.map(getSponsorMeta).filter((sponsor) => sponsor.name.length > 0);

  if (normalizedSponsors.length === 0) {
    return null;
  }

  return (
    <div className={styles.wall}>
      {TIERS.map((tier) => {
        const tierSponsors = normalizedSponsors.filter((sponsor) => sponsor.tier === tier);

        if (tierSponsors.length === 0) {
          return null;
        }

        return (
          <ul className={`${styles.tierRow} ${tierRowClassName[tier]}`} key={tier}>
            {tierSponsors.map((sponsor, index) => {
              const logoContent = sponsor.logoSrc ? (
                <img alt={`Logotyp sponsora ${sponsor.name}`} className={styles.logoImage} src={sponsor.logoSrc} />
              ) : (
                <span className={styles.logoCode}>{getSponsorCode(sponsor.name) || 'SP'}</span>
              );

              return (
                <li className={styles.logoItem} key={`${sponsor.name}-${index}`}>
                  {sponsor.websiteUrl ? (
                    <a
                      aria-label={`Odwiedź stronę sponsora ${sponsor.name}`}
                      className={styles.logoLink}
                      href={sponsor.websiteUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {logoContent}
                    </a>
                  ) : (
                    logoContent
                  )}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
