import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MAIN_CONTENT_ID } from '../../utils/config';
import { RetryButton } from './RetryButton';

afterEach(() => {
  cleanup();
});

describe('RetryButton', () => {
  it('asks for the data again and keeps focus in the page content', async () => {
    const onRetry = vi.fn();

    render(
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <RetryButton onRetry={onRetry} />
      </main>,
    );
    await userEvent.setup().click(screen.getByRole('button', { name: 'Spróbuj ponownie' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('main')).toHaveFocus();
  });
});
