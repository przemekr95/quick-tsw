import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { HeroSlide } from '../../types/domain';
import { HeroBackground } from './HeroBackground';

afterEach(cleanup);

const mockSlides: HeroSlide[] = [
  { id: 'k-1', imageSrc: '/images/backgrounds/k/k-1.jpg', imageAlt: 'Slajd 1', title: 'Pasja i determinacja', text: 'Gramy z sercem.' },
  { id: 'k-2', imageSrc: '/images/backgrounds/k/k-2.jpg', imageAlt: 'Slajd 2', title: 'Razem silniejsze', text: 'Drużyna, która tworzy historię.' },
  { id: 'k-3', imageSrc: '/images/backgrounds/k/k-3.jpg', imageAlt: 'Slajd 3', title: 'Dołącz do nas', text: 'Treningi otwarte.' },
];

describe('HeroBackground', () => {
  it('renders labeled hero wrapper', () => {
    render(
      <HeroBackground activeIndex={0} sectionLabel="Kobiety" slides={mockSlides}>
        <p>Treść</p>
      </HeroBackground>,
    );

    expect(screen.getByLabelText('Tło sekcji Kobiety')).toBeInTheDocument();
    expect(screen.getByText('Treść')).toBeInTheDocument();
  });

  it('renders all slide images', () => {
    const { container } = render(
      <HeroBackground activeIndex={0} sectionLabel="Kobiety" slides={mockSlides} />,
    );

    expect(container.querySelectorAll('img')).toHaveLength(mockSlides.length);
  });

  it('applies active class to the slide matching activeIndex', () => {
    const { container } = render(
      <HeroBackground activeIndex={1} sectionLabel="Kobiety" slides={mockSlides} />,
    );

    const figures = container.querySelectorAll('figure');
    expect(figures[1].className).toMatch(/slideActive/);
    expect(figures[0].className).not.toMatch(/slideActive/);
  });
});
