import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionNav } from './SectionNav';

describe('SectionNav', () => {
  it('renders an anchor link for every club section', () => {
    render(<SectionNav />);

    expect(screen.getByRole('link', { name: 'O klubie' })).toHaveAttribute('href', '#o-klubie');
    expect(screen.getByRole('link', { name: 'Nasza drużyna' })).toHaveAttribute('href', '#nasza-druzyna');
    expect(screen.getByRole('link', { name: 'Dołącz do nas' })).toHaveAttribute('href', '#dolacz-do-nas');
    expect(screen.getByRole('link', { name: 'Najbliższy mecz' })).toHaveAttribute('href', '#najblizszy-mecz');
  });
});
