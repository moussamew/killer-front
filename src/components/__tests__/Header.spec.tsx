import { render } from '@testing-library/react';

import { Header } from '..';
import { PlayerStatus } from '../../app/constants';
import { renderWithPlayerContext } from '../../hooks/context';

const dummyPlayerSession = {
  id: 0,
  name: 'John Wick',
  status: PlayerStatus.ALIVE,
};

describe('<Header />', () => {
  it('should render correctly Header with application title', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', () => {
    const { getByText } = renderWithPlayerContext(
      <Header />,
      dummyPlayerSession,
    );

    expect(getByText('John Wick')).toBeInTheDocument();
  });
});
