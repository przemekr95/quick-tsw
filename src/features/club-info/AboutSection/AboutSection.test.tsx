import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders club name, history and arena address from props', () => {
    render(
      <AboutSection
        arenaAddress="ul. Sportowa 1, 00-000 Miasto"
        clubName="MKS Siatkówka Mężczyźni"
        history="Historia klubu opisana w kilku zdaniach."
        imageAlt="Zdjęcie klubowe"
        imageSrc="/images/backgrounds/hero-m.jpg"
      />,
    );

    expect(screen.getByRole('heading', { name: 'MKS Siatkówka Mężczyźni' })).toBeInTheDocument();
    expect(screen.getByText('Historia klubu opisana w kilku zdaniach.')).toBeInTheDocument();
    expect(screen.getByText(/ul\. Sportowa 1, 00-000 Miasto/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Zdjęcie klubowe' })).toBeInTheDocument();
  });
});
