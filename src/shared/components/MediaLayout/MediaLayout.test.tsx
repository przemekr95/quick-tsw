import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { MediaLayout } from './MediaLayout';

afterEach(() => {
  cleanup();
});

describe('MediaLayout', () => {
  it('renders the brand nav, footer and children content', () => {
    render(
      <MemoryRouter>
        <MediaLayout>
          <p>Zawartość strony Media</p>
        </MediaLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByText('Zawartość strony Media')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Powrót do wyboru sekcji' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('applies the media theme to the page root', () => {
    const { container } = render(
      <MemoryRouter>
        <MediaLayout>
          <p>Zawartość</p>
        </MediaLayout>
      </MemoryRouter>,
    );

    expect(container.querySelector('[data-theme="media"]')).toBeInTheDocument();
  });
});
