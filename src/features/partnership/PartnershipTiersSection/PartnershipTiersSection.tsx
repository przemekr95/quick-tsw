import styles from './PartnershipTiersSection.module.scss';

type PartnershipTierKey = 'primary' | 'secondary' | 'tertiary';

interface PartnershipTier {
  key: PartnershipTierKey;
  name: string;
  description: string;
  perks: string[];
}

const PARTNERSHIP_TIERS: PartnershipTier[] = [
  {
    key: 'primary',
    name: 'Partner Główny',
    description:
      'Twoja marka towarzyszy nam przez cały sezon - na strojach, na hali i we wszystkich materiałach klubu.',
    perks: [
      'Logo na strojach meczowych obu sekcji',
      'Ekspozycja na hali podczas każdego meczu',
      'Wyróżnione miejsce w materiałach i mediach klubu',
    ],
  },
  {
    key: 'secondary',
    name: 'Partner',
    description:
      'Obecność podczas wybranych meczów i wydarzeń oraz stałe miejsce w komunikacji cyfrowej klubu.',
    perks: [
      'Logo na banerach podczas wybranych meczów',
      'Wzmianki w mediach społecznościowych klubu',
      'Zaproszenia na wydarzenia klubowe',
    ],
  },
  {
    key: 'tertiary',
    name: 'Partner Wspierający',
    description:
      'Wsparcie jednorazowe lub rzeczowe z podziękowaniem widocznym dla całej społeczności klubu.',
    perks: [
      'Podziękowanie w Strefie Przyjaciół',
      'Wzmianka w podsumowaniu sezonu',
      'Możliwość rozwoju współpracy w przyszłości',
    ],
  },
];

const tierCellClassName: Record<PartnershipTierKey, string> = {
  primary: `${styles.cell} ${styles.cellFeatured}`,
  secondary: styles.cell,
  tertiary: styles.cell,
};

export function PartnershipTiersSection() {
  return (
    <section
      aria-labelledby="pakiety-partnerskie-heading"
      className={styles.section}
      id="pakiety-partnerskie"
    >
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Oferta</p>
        <h2 className={styles.title} id="pakiety-partnerskie-heading">
          Pakiety partnerskie
        </h2>
      </div>

      <ul className={styles.grid}>
        {PARTNERSHIP_TIERS.map((tier) => (
          <li className={tierCellClassName[tier.key]} key={tier.key}>
            {tier.key === 'primary' ? <p className={styles.featuredBadge}>Polecane</p> : null}
            <p className={styles.tierName}>{tier.name}</p>
            <p className={styles.tierDescription}>{tier.description}</p>
            <ul className={styles.perks}>
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
