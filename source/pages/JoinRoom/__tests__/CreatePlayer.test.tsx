import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { fakePlayerOne } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import { CreatePlayer } from '../CreatePlayer';

describe('<CreatePlayer />', () => {
  it('should navigate to the room page joigned with the pseudo created by the user', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText('Pas de nom associé !');

    await userEvent.type(
      screen.getByPlaceholderText('Choisir un nom'),
      fakePlayerOne.name,
    );

    await userEvent.click(screen.getByText('Rejoindre cette partie'));

    server.use(
      rest.get(SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est SOSPC.'),
    ).toBeInTheDocument();
  });

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText('Pas de nom associé !');

    await userEvent.click(screen.getByText('Créer ma partie'));

    expect(
      await screen.findByText('Ça vous tente un petit meurtre entre amis ?'),
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

    renderWithProviders({ component: <CreatePlayer /> });

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
