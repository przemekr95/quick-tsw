import type { Patron, SectionId } from '../../shared/types/domain';
import patronsMezczyzni from '../mocks/patrons.mezczyzni.json';

const patronsBySection: Record<SectionId, Patron[]> = {
  mezczyzni: patronsMezczyzni as Patron[],
};

export async function getPatronsData(section: SectionId): Promise<Patron[]> {
  return Promise.resolve(patronsBySection[section]);
}
