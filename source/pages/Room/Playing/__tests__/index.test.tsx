import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerStatus } from '@/services/player/constants';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayingRoomPage />', () => {
  it('should render playing room page with current target', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText('La cible à tuer est..'),
    ).toBeInTheDocument();
    expect(screen.getByText('NEO')).toBeInTheDocument();
  });

  it('should render playing room page with dead message if the player is dead', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...playingRoomSession, status: PlayerStatus.KILLED }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(
      "Les morts ne racontent pas d'histoires... Vous devez juste attendre la fin du jeu.",
    );

    expect(
      screen.getByText(
        "Les morts ne racontent pas d'histoires... Vous devez juste attendre la fin du jeu.",
      ),
    ).toBeInTheDocument();
  });
});
