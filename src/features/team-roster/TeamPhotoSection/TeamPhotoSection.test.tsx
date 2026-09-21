import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TeamPhotoSection } from './TeamPhotoSection';

describe('TeamPhotoSection', () => {
  it('renders the heading and the team photo', () => {
    render(<TeamPhotoSection />);

    expect(screen.getByRole('heading', { name: 'Poznaj zespół' })).toBeInTheDocument();

    const image = screen.getByRole('img', {
      name: 'Drużyna siatkarska podczas wspólnego zdjęcia zespołowego',
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/quick-tsw/images/backgrounds/team.jpg');
  });
});
