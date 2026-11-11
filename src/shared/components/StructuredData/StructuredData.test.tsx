import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StructuredData } from './StructuredData';

afterEach(() => {
  cleanup();
});

describe('StructuredData', () => {
  it('renders the data as a JSON-LD script that cannot be closed by its own text', () => {
    const { container } = render(
      <StructuredData data={{ '@type': 'Person', name: '</script><b>Jan</b>' }} />,
    );

    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script?.innerHTML).not.toContain('</script>');
    expect(JSON.parse(script?.textContent ?? '')).toEqual({
      '@type': 'Person',
      name: '</script><b>Jan</b>',
    });
  });
});
