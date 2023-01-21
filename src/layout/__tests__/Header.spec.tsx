import { screen } from '@testing-library/react';

import { fakePlayerOne } from '@/tests/mocks/players';
import { renderWithProviders } from '@/tests/utils';

import Header from '../Header';

describe('<Header />', () => {
  it('should render correctly Header with application title', async () => {
    renderWithProviders({ component: <Header /> });

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', async () => {
    renderWithProviders({
      component: <Header playerName={fakePlayerOne.name} />,
    });

    expect(await screen.findByText(fakePlayerOne.name)).toBeInTheDocument();
  });
});
