import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { playerInPendingRoom, fakePlayer } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { CreatePlayer } from '../CreatePlayer';

describe('<CreatePlayer />', () => {
  it('should navigate to the room page joigned with the pseudo created by the user', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await userEvent.type(
      await screen.findByPlaceholderText('Choose a pseudo'),
      fakePlayer.name,
    );

    await userEvent.click(
      await screen.findByText('Continue and join the room'),
    );

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText('No pseudo found yet!');

    await userEvent.click(screen.getByText('Create my own room'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });

  it.skip('should show an error when the player cannot join the room', async () => {
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

    renderWithProviders({ component: <CreatePlayer roomCode="X7JKL" /> });

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      'Morpheus',
    );

    await userEvent.click(screen.getByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
