import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  ROOM_ENDPOINT,
  SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { fakePlayerOne } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { noRoomSession, pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<JoinRoomModal />', () => {
  it('should join a room when player has a session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    renderWithProviders();

    await userEvent.click(await screen.findByText(t('home.join.room')));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.join.room.code.placeholder')),
      roomCode,
    );

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await userEvent.click(screen.getByText(t('home.join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should close modal after joining a room without player session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(401), ctx.json(null)),
      ),
    );

    renderWithProviders();

    await screen.findByText(t('home.title'));

    await userEvent.click(screen.getByText(t('home.join.room')));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.create.pseudo.placeholder')),
      fakePlayerOne.name,
    );

    await userEvent.type(
      screen.getByPlaceholderText(t('home.join.room.code.placeholder')),
      roomCode,
    );

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await userEvent.click(screen.getByText(t('home.join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should show error while joining a room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: 'ROOM.NOT_FOUND', message: 'Room not found' }),
        ),
      ),
    );

    renderWithProviders();

    await screen.findByText('Neo');

    await userEvent.click(screen.getByText('Join a room'));

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      'AABB1',
    );

    await userEvent.click(screen.getByText('Join this room'));

    expect(await screen.findByText('Room not found')).toBeInTheDocument();
  });
});
