import { render } from '@testing-library/react';

import { Layout } from '..';
import { PlayerStatus } from '../../app/constants';
import { renderWithPlayerContext } from '../../hooks/context';

const dummyPlayerSession = {
  id: 0,
  name: 'John Wick',
  status: PlayerStatus.ALIVE,
};

describe('<Layout />', () => {
  it('should render correctly Layout with application title', () => {
    const { getByText } = render(
      <Layout>
        <div />
      </Layout>,
    );

    expect(getByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', () => {
    const { getByText } = renderWithPlayerContext(
      <Layout>
        <div />
      </Layout>,
      dummyPlayerSession,
    );

    expect(getByText('John Wick')).toBeInTheDocument();
  });
});
