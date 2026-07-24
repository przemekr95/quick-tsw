import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroCtaButton } from './HeroCtaButton';

describe('HeroCtaButton', () => {
  it('renders accessible anchor button', () => {
    render(<HeroCtaButton label="Przejdź do treści" targetId="section-content" />);

    const button = screen.getByRole('link', { name: 'Przejdź do treści' });
    expect(button).toHaveAttribute('href', '#section-content');
  });
});
