import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MediaInfo } from './MediaInfo';

describe('MediaInfo', () => {
  it('renders the brand book, club colors and roster download sections', () => {
    render(<MediaInfo />);

    expect(screen.getByRole('region', { name: 'Zakładka Media' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kolory klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();
  });
});
