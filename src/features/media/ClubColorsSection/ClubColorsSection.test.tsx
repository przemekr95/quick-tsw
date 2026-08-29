import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ClubColorsSection } from './ClubColorsSection';

describe('ClubColorsSection', () => {
  it('renders every club color with its name and hex code', () => {
    render(<ClubColorsSection />);

    expect(screen.getByRole('heading', { name: 'Kolory klubu' })).toBeInTheDocument();
    expect(screen.getByText('Niebieski')).toBeInTheDocument();
    expect(screen.getByText('#273583')).toBeInTheDocument();
    expect(screen.getByText('Czerwony')).toBeInTheDocument();
    expect(screen.getByText('#E30613')).toBeInTheDocument();
    expect(screen.getByText('Złoty')).toBeInTheDocument();
    expect(screen.getByText('#EFBC7B')).toBeInTheDocument();
  });
});
