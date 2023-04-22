import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/render';

import Header from '../Header';

describe('<Header />', () => {
  it('should render correctly Header with application title', async () => {
    renderWithProviders({ component: <Header /> });

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });
});
