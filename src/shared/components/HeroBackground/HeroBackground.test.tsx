import { act, cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HeroBackground } from './HeroBackground';

afterEach(cleanup);

describe('HeroBackground', () => {
  it('renders labeled hero wrapper', () => {
    render(
      <HeroBackground sectionLabel="Kobiety" sectionPath="/kobiety">
        <p>Treść</p>
      </HeroBackground>,
    );

    expect(screen.getByLabelText('Tło sekcji Kobiety')).toBeInTheDocument();
    expect(screen.getByText('Treść')).toBeInTheDocument();
  });

  it('clicking a pagination bullet makes it the active slide', async () => {
    const { container } = render(<HeroBackground sectionLabel="Kobiety" sectionPath="/kobiety" />);

    const bullets = within(container).getAllByRole('button', { name: /Przejdź do slajdu/ });
    expect(bullets).toHaveLength(2);

    // Initially slide 1 is active — counter shows "01 / 02"
    expect(within(container).getByText(/01 \/ 02/)).toBeInTheDocument();

    // Click the second bullet
    await userEvent.click(bullets[1]);

    // Counter should now show "02 / 02"
    expect(within(container).getByText(/02 \/ 02/)).toBeInTheDocument();
  });

  describe('auto-advance interval', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('advances to the next slide after 6 seconds', () => {
      const { container } = render(
        <HeroBackground sectionLabel="Kobiety" sectionPath="/kobiety" />,
      );

      // Initially on slide 1
      expect(within(container).getByText(/01 \/ 02/)).toBeInTheDocument();

      // Advance fake clock by 6 seconds and flush React state updates
      act(() => {
        vi.advanceTimersByTime(6000);
      });

      // Should now be on slide 2
      expect(within(container).getByText(/02 \/ 02/)).toBeInTheDocument();
    });
  });
});
