import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HeroCtaButton } from './HeroCtaButton';

describe('HeroCtaButton', () => {
  it('renders an in-page anchor for a hash href', () => {
    render(<HeroCtaButton href="#section-content" label="Przejdź do treści" />);

    const button = screen.getByRole('link', { name: 'Przejdź do treści' });
    expect(button).toHaveAttribute('href', '#section-content');
    expect(button).not.toHaveAttribute('target');
  });

  it('renders an internal route link with client-side routing', () => {
    render(
      <MemoryRouter>
        <HeroCtaButton href="../kontakt" label="Skontaktuj się z nami" />
      </MemoryRouter>,
    );

    const button = screen.getByRole('link', { name: 'Skontaktuj się z nami' });
    expect(button).toHaveAttribute('href', '/kontakt');
  });

  it('renders an external link that opens in a new tab', () => {
    render(<HeroCtaButton href="https://www.facebook.com/example" label="Zobacz aktualności" />);

    const button = screen.getByRole('link', { name: 'Zobacz aktualności' });
    expect(button).toHaveAttribute('href', 'https://www.facebook.com/example');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
