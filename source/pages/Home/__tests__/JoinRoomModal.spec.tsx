import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    await userEvent.click(await screen.findByText('Rejoindre une partie'));

    await userEvent.type(
      screen.getByPlaceholderText('Code de la partie'),
      roomCode,
    );

    await userEvent.click(screen.getByText('Rejoindre cette partie'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est SOSPC.'),
    ).toBeInTheDocument();
  });

  it('should close modal after joining a room without player session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(401), ctx.json(null)),
      ),
    );

    renderWithProviders();

    await screen.findByText('Ça vous tente un petit meurtre entre amis ?');

    await userEvent.click(screen.getByText('Rejoindre une partie'));

    await userEvent.type(
      screen.getByPlaceholderText('Choisir un nom'),
      fakePlayerOne.name,
    );

    await userEvent.type(
      screen.getByPlaceholderText('Code de la partie'),
      roomCode,
    );

    await userEvent.click(screen.getByText('Rejoindre cette partie'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est SOSPC.'),
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
