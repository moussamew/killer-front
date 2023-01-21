import { screen } from '@testing-library/react';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { playerWithoutRoom, playerInPendingRoom } from '@/tests/mocks/players';
import {
  roomCode,
  pendingRoom,
  pendingRoomWithMultiplePlayers,
} from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<JoinRoomPage />', () => {
  it('should let the user join automatically the room if the roomCode saved in his session is the same', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should let the player join automatically the room if his name is correctly setted and he is not already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
    );

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it.skip('should redirect the player to not found page if the room code is incorrect', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
      rest.patch(`${PLAYER_ENDPOINT}/${playerWithoutRoom.id}`, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: RoomErrorCode.BAD_ROOMCODE }),
        ),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText('Oops, something goes wrong!');

    expect(
      screen.getByText('The room you requested can not be found.'),
    ).toBeInTheDocument();
  });
});
