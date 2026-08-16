import type { StaffMember, StaffRole } from '../../../shared/types/domain';
import styles from './StaffSection.module.scss';

interface StaffSectionProps {
  staff: StaffMember[];
}

const roleGenitiveForm: Record<StaffRole, string> = {
  Trener: 'trenera',
  Statystyk: 'statystyka',
};

export function StaffSection({ staff }: StaffSectionProps) {
  return (
    <section aria-labelledby="sztab-heading" className={styles.section} id="sztab">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Sztab szkoleniowy</p>
        <h2 className={styles.title} id="sztab-heading">
          Sztab
        </h2>
      </div>

      <ul className={styles.grid}>
        {staff.map((member) => (
          <li className={styles.card} key={`${member.role}-${member.lastName}`}>
            <img
              alt={`Zdjęcie ${roleGenitiveForm[member.role]} ${member.firstName} ${member.lastName}`}
              className={styles.image}
              loading="lazy"
              src={member.photoSrc}
            />
            <div className={styles.meta}>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.name}>
                {member.firstName} {member.lastName}
              </p>
              <p className={styles.bio}>{member.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
