import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { HeroCtaButton } from './HeroCtaButton';

afterEach(() => {
  cleanup();
});

describe('HeroCtaButton', () => {
  it('renders an in-page anchor for a hash href', () => {
    render(
      <HeroCtaButton
        href="#section-content"
        label="Przejdź do treści"
        relativeTo="/mezczyzni/klub"
      />,
    );

    const button = screen.getByRole('link', { name: 'Przejdź do treści' });
    expect(button).toHaveAttribute('href', '#section-content');
    expect(button).not.toHaveAttribute('target');
  });

  it('resolves a relative href against the page it was written for', () => {
    render(
      <MemoryRouter initialEntries={['/MEZCZYZNI/KLUB/']}>
        <HeroCtaButton
          href="../kontakt"
          label="Skontaktuj się z nami"
          relativeTo="/mezczyzni/klub"
        />
      </MemoryRouter>,
    );

    const button = screen.getByRole('link', { name: 'Skontaktuj się z nami' });
    expect(button).toHaveAttribute('href', '/mezczyzni/kontakt');
  });

  it.each(['mailto:siatkowkamezczyzn@tswisla.pl', 'tel:+48123456789'])(
    'keeps the %s href as a plain link in the same tab',
    (href) => {
      render(<HeroCtaButton href={href} label="Napisz do nas" relativeTo="/mezczyzni/klub" />);

      const button = screen.getByRole('link', { name: 'Napisz do nas' });
      expect(button).toHaveAttribute('href', href);
      expect(button).not.toHaveAttribute('target');
    },
  );

  it.each(['https://www.facebook.com/example', '//www.tswisla.pl/'])(
    'opens the external %s link in a new tab',
    (href) => {
      render(<HeroCtaButton href={href} label="Zobacz aktualności" relativeTo="/mezczyzni/klub" />);

      const button = screen.getByRole('link', { name: 'Zobacz aktualności' });
      expect(button).toHaveAttribute('href', href);
      expect(button).toHaveAttribute('target', '_blank');
      expect(button).toHaveAttribute('rel', 'noopener noreferrer');
    },
  );
});
