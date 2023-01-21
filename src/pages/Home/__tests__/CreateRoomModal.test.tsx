import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { fakePlayer } from '@/tests/mocks/players';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

import { CreateRoomModal } from '../CreateRoomModal';

describe('<CreateRoomModal />', () => {
  it('should close modal after creating a new room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithRouter(<AppRoutes />);

    await screen.findByText('The right way to kill your friends..');

    await userEvent.click(screen.getByText('Create new room'));

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      fakePlayer.name,
    );

    await userEvent.click(screen.getByText('Create my room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Create my room'));

    expect(screen.queryByText('Create my room')).not.toBeInTheDocument();
  });

  it.skip('should show error message while creating new player with a new room', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, async (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot create a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithRouter(<CreateRoomModal />);

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      'Morpheus',
    );

    await userEvent.click(screen.getByText('Create my room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
