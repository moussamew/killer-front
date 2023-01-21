import { screen } from '@testing-library/react';

import { fakePlayer } from '@/tests/mocks/players';
import { renderComponent } from '@/tests/utils';

import Header from '../Header';

describe('<Header />', () => {
  it('should render correctly Header with application title', async () => {
    renderComponent(<Header />);

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', async () => {
    renderComponent(<Header playerName={fakePlayer.name} />);

    expect(await screen.findByText(fakePlayer.name)).toBeInTheDocument();
  });
});
