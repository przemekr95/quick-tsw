import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandBookSection } from './BrandBookSection';

describe('BrandBookSection', () => {
  it('renders the crest image and a download link for the brand book', () => {
    render(<BrandBookSection />);

    expect(screen.getByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Herb klubu/ })).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Pobierz księgę znaków/ });
    expect(link).toHaveAttribute('download');
  });
});
