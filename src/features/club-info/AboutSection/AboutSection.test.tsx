import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders club name and history from props', () => {
    render(
      <AboutSection
        clubName="TS Wisła Kraków"
        history="Historia klubu opisana w kilku zdaniach."
        imageAlt="Zdjęcie klubowe"
        imageSrc="/images/backgrounds/hero-m.jpg"
      />,
    );

    expect(screen.getByRole('heading', { name: 'TS Wisła Kraków' })).toBeInTheDocument();
    expect(screen.getByText('Historia klubu opisana w kilku zdaniach.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Zdjęcie klubowe' })).toBeInTheDocument();
  });
});
