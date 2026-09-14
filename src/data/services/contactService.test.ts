import { describe, expect, it } from 'vitest';
import { getContactData } from './contactService';

describe('contactService', () => {
  it('returns contact data for mezczyzni', async () => {
    const data = await getContactData('mezczyzni');

    expect(data.email).toContain('@');
  });
});
