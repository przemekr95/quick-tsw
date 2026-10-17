import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CLUB_CREST_SRC } from '../../utils/config';
import { CrestLoader } from './CrestLoader';

describe('CrestLoader', () => {
  it('renders the club crest as decoration hidden from assistive technology', () => {
    const { container } = render(<CrestLoader />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('src', CLUB_CREST_SRC);
  });
});
