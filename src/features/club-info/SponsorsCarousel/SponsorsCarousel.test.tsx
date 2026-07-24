import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SponsorsCarousel } from './SponsorsCarousel';

describe('SponsorsCarousel', () => {
  it('renders sponsor carousel and allows switching slides', async () => {
    const user = userEvent.setup();

    render(<SponsorsCarousel sponsors={['[Sponsor A]', '[Sponsor B]']} />);

    expect(screen.getByRole('region', { name: 'Karuzela logotypów sponsorów' })).toBeInTheDocument();
    expect(screen.getByText('[Sponsor A]')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Następny sponsor' }));

    expect(screen.getByText('[Sponsor B]')).toBeInTheDocument();
  });
});
