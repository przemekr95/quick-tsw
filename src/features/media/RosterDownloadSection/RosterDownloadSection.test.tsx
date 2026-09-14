import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RosterDownloadSection } from './RosterDownloadSection';

describe('RosterDownloadSection', () => {
  it('renders a download link for each section roster', () => {
    render(<RosterDownloadSection />);

    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    const mezczyzniLink = screen.getByRole('link', { name: /Pobierz skład - Mężczyźni/ });
    expect(mezczyzniLink).toHaveAttribute('href', '/downloads/sklad-mezczyzni.pdf');
    expect(mezczyzniLink).toHaveAttribute('download');
  });
});
