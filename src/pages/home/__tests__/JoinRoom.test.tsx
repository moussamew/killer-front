import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from 'constants/endpoints';
import Layout from 'layout/Layout';
import { server } from 'tools/server';
import { renderWithProviders } from 'tools/tests/utils';

import JoinRoom from '../JoinRoom';

const dummyProps = {
  inputPseudo: '',
  showInputErrorMessage: jest.fn(),
};

describe('<JoinRoom />', () => {
  it('should show the button to join a room', () => {
    render(<JoinRoom {...dummyProps} />);

    expect(screen.getByText('Join a room')).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on join room if the user is authenticated', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <Layout>
        <JoinRoom {...dummyProps} />
      </Layout>,
    );

    fireEvent.click(await screen.findByText('Join a room'));

    expect(await screen.findByText('Join this room')).toBeInTheDocument();
  });
});
