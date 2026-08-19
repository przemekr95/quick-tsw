import { describe, expect, it } from 'vitest';
import { toTelHref } from './phone';

describe('toTelHref', () => {
  it('strips formatting characters, keeping only digits and a leading +', () => {
    expect(toTelHref('+48 000 000 003')).toBe('tel:+48000000003');
  });
});
