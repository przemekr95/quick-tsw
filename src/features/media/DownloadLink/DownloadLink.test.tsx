import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DownloadLink } from './DownloadLink';

describe('DownloadLink', () => {
  it('renders a download link pointing at the given file', () => {
    render(<DownloadLink href="/downloads/plik.pdf">Pobierz plik</DownloadLink>);

    const link = screen.getByRole('link', { name: /Pobierz plik/ });

    expect(link).toHaveAttribute('href', '/downloads/plik.pdf');
    expect(link).toHaveAttribute('download');
  });
});
