import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RosterDownloadSection } from './RosterDownloadSection';

describe('RosterDownloadSection', () => {
  it('renders a download link for each section roster', () => {
    render(<RosterDownloadSection />);

    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    const seniorzyLink = screen.getByRole('link', { name: /Pobierz skład - Seniorzy/ });
    expect(seniorzyLink).toHaveAttribute('href', '/downloads/sklad-mezczyzni.pdf');
    expect(seniorzyLink).toHaveAttribute('download');
  });
});
