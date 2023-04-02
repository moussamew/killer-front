import { screen } from '@testing-library/react';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import {
  roomCode,
  pendingRoom,
  pendingRoomWithMultiplePlayers,
} from '@/tests/mocks/rooms';
import { noRoomSession, pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<JoinRoomPage />', () => {
  it('should let the user join automatically the room if the roomCode saved in his session is the same', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should let the player join automatically the room if his name is correctly setted and he is not already inside a room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
    );

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should redirect the player to not found page if the room code is incorrect', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
      rest.patch(`${PLAYER_ENDPOINT}/${noRoomSession.id}`, (_, res, ctx) =>
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
