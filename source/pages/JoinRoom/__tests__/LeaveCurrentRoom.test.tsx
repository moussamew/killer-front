import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import { LeaveCurrentRoom } from '../LeaveCurrentRoom';

describe('<LeaveCurrentRoom />', () => {
  const newRoomCode = 'XAB4L';

  it('should join a new room and leave the current one', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
    );

    renderWithProviders({ route: `/join/${newRoomCode}` });

    await screen.findByText(t('join.room.already.inside.room', { roomCode }));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            room: { ...pendingRoomSession.room, code: newRoomCode },
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/${newRoomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ ...pendingRoom, code: newRoomCode })),
      ),
    );

    await userEvent.click(screen.getByText(t('join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode: newRoomCode })),
    ).toBeInTheDocument();
  });

  it('should let the player return to its current room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/join/${newRoomCode}` });

    await screen.findByText(t('join.room.already.inside.room', { roomCode }));

    await userEvent.click(screen.getByText(t('join.room.return.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should not let the player join a room if his name is already used', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot join a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithProviders({ component: <LeaveCurrentRoom /> });

    await userEvent.click(screen.getByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot join a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
