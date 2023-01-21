import { screen } from '@testing-library/react';

import { fakePlayer } from '@/tests/mocks/players';
import { renderWithRouter } from '@/tests/utils';

import Header from '../Header';

describe('<Header />', () => {
  it('should render correctly Header with application title', async () => {
    renderWithRouter(<Header />);

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', async () => {
    renderWithRouter(<Header playerName={fakePlayer.name} />);

    expect(await screen.findByText(fakePlayer.name)).toBeInTheDocument();
  });
});
