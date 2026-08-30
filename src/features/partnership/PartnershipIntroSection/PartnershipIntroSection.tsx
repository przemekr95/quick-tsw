import styles from './PartnershipIntroSection.module.scss';

const BENEFITS = [
  'Stała ekspozycja marki podczas meczów obu sekcji',
  'Obecność w materiałach klubowych i mediach społecznościowych',
  'Współtworzenie historii klubu założonego w 1906 roku',
  'Warunki dopasowane do możliwości Twojej firmy',
];

export function PartnershipIntroSection() {
  return (
    <section
      aria-labelledby="zostan-partnerem-heading"
      className={styles.section}
      id="zostan-partnerem"
    >
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>Współpraca biznesowa</p>
          <h2 className={styles.title} id="zostan-partnerem-heading">
            Zostań Partnerem
          </h2>
        </div>
        <p className={styles.lead}>
          Siatkówka to widowisko, które gromadzi kibiców na trybunach i przed ekranami przez cały
          sezon. Partnerstwo z Towarzystwem Sportowym Wisła Kraków to realna obecność Twojej marki
          przy każdym secie - na hali, w mediach klubowych i w sercu lokalnej społeczności.
        </p>
      </div>

      <ul className={styles.list}>
        {BENEFITS.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </section>
  );
}
