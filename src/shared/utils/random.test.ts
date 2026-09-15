import { describe, expect, it } from 'vitest';
import { pickRandomItems } from './random';

describe('pickRandomItems', () => {
  it('returns the requested number of items when there are enough to choose from', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];

    const result = pickRandomItems(items, 4);

    expect(result).toHaveLength(4);
  });

  it('only returns items that exist in the source array, without duplicates', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];

    const result = pickRandomItems(items, 3);

    expect(new Set(result).size).toBe(result.length);
    result.forEach((item) => expect(items).toContain(item));
  });

  it('caps the result at the source length when count exceeds it', () => {
    const items = [1, 2, 3];

    const result = pickRandomItems(items, 10);

    expect(result).toHaveLength(3);
  });

  it('does not mutate the source array', () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];

    pickRandomItems(items, 2);

    expect(items).toEqual(copy);
  });

  it('returns an empty array for an empty source', () => {
    expect(pickRandomItems([], 4)).toEqual([]);
  });
});
