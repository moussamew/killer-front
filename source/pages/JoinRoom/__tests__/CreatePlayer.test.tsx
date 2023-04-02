import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
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

    await screen.findByText(t('join.room.no.pseudo'));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.create.pseudo.placeholder')),
      fakePlayerOne.name,
    );

    server.use(
      rest.get(SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await userEvent.click(screen.getByText(t('home.join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText(t('join.room.no.pseudo'));

    await userEvent.click(
      screen.getByText(t('home.create.room.confirm.button')),
    );

    expect(await screen.findByText(t('home.title'))).toBeInTheDocument();
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
