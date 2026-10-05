import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExternalLinkIcon } from './ExternalLinkIcon';

describe('ExternalLinkIcon', () => {
  it('renders a decorative icon hidden from assistive technology', () => {
    const { container } = render(<ExternalLinkIcon className="icon" />);

    const icon = container.querySelector('svg');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass('icon');
  });
});
