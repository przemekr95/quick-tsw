import styles from './ClubColorsSection.module.scss';

type ClubColorKey = 'blue' | 'red' | 'gold' | 'gray' | 'black' | 'white';

interface ClubColor {
  key: ClubColorKey;
  name: string;
  pantone: string;
  hex: string;
}

const CLUB_COLORS: ClubColor[] = [
  {
    key: 'blue',
    name: 'Niebieski',
    pantone: 'PANTONE 286 C',
    hex: '#273583',
  },
  {
    key: 'white',
    name: 'Biały',
    pantone: 'PANTONE 000 C',
    hex: '#FFFFFF',
  },
  {
    key: 'red',
    name: 'Czerwony',
    pantone: 'PANTONE 1795 C',
    hex: '#E30613',
  },
  {
    key: 'gold',
    name: 'Złoty',
    pantone: 'PANTONE 7509 C',
    hex: '#EFBC7B',
  },
  {
    key: 'gray',
    name: 'Szary',
    pantone: 'PANTONE Cool Gray 3 C',
    hex: '#404040',
  },
  {
    key: 'black',
    name: 'Czarny',
    pantone: 'PANTONE Process Black C',
    hex: '#000000',
  },
];

const swatchClassByKey: Record<ClubColorKey, string> = {
  blue: styles.swatchBlue,
  red: styles.swatchRed,
  gold: styles.swatchGold,
  gray: styles.swatchGray,
  black: styles.swatchBlack,
  white: styles.swatchWhite,
};

export function ClubColorsSection() {
  return (
    <section aria-labelledby="kolory-klubu-heading" className={styles.section} id="kolory-klubu">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Identyfikacja wizualna</p>
        <h2 className={styles.title} id="kolory-klubu-heading">
          Kolory klubu
        </h2>
      </div>

      <ul className={styles.grid}>
        {CLUB_COLORS.map((color) => (
          <li className={styles.cell} key={color.hex}>
            <span
              aria-hidden="true"
              className={`${styles.swatch} ${swatchClassByKey[color.key]}`}
            />
            <p className={styles.name}>{color.name}</p>
            <p className={styles.pantone}>{color.pantone}</p>
            <p className={styles.hex}>{color.hex}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
