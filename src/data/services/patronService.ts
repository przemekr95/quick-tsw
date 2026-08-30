import type { Patron, SectionId } from '../../shared/types/domain';
import patronsKobiety from '../mocks/patrons.kobiety.json';
import patronsMezczyzni from '../mocks/patrons.mezczyzni.json';

const patronsBySection: Record<SectionId, Patron[]> = {
  kobiety: patronsKobiety as Patron[],
  mezczyzni: patronsMezczyzni as Patron[],
};

export async function getPatronsData(section: SectionId): Promise<Patron[]> {
  return Promise.resolve(patronsBySection[section]);
}
