import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('should join a new room and leave the current one', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
    );

    renderWithProviders({ route: '/join/XAB4L' });

    await screen.findByText(`Déjà à l'intérieur de la partie SOSPC !`);

    await userEvent.click(screen.getByText('Continuer et rejoindre la partie'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            room: { ...pendingRoomSession.room, code: 'XAB4L' },
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/XAB4L`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ ...pendingRoom, code: 'XAB4L' })),
      ),
    );

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est XAB4L.'),
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

    renderWithProviders({ route: '/join/XAB4L' });

    await screen.findByText(`Déjà à l'intérieur de la partie SOSPC !`);

    await userEvent.click(screen.getByText('Retourner dans ma partie'));

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est SOSPC.'),
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
