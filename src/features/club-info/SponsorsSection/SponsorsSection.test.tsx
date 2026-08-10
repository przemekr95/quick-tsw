import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsSection } from './SponsorsSection';

const sponsors: Sponsor[] = [{ name: 'Sponsor 1', logoSrc: '/logo.png', websiteUrl: 'https://example.com' }];

describe('SponsorsSection', () => {
  it('renders the heading and the sponsors carousel', () => {
    render(<SponsorsSection sponsors={sponsors} />);

    expect(screen.getByRole('heading', { name: 'Partnerzy klubu' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /karuzela logotypów sponsorów/i })).toBeInTheDocument();
  });
});
