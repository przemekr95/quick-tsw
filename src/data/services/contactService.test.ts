import { describe, expect, it } from 'vitest';
import { getContactData } from './contactService';

describe('contactService', () => {
  it('returns contact data for kobiety', async () => {
    const data = await getContactData('kobiety');

    expect(data.email).toContain('@');
  });

  it('returns contact data for mezczyzni', async () => {
    const data = await getContactData('mezczyzni');

    expect(data.email).toContain('@');
  });
});
