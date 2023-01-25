import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerStatus } from '@/services/player/constants';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerKilledModal />', () => {
  it('should close killed modal when the user confirm his death', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByText(`J'ai été tué`));

    await userEvent.click(screen.getByText('Tuez-moi'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...playingRoomSession, status: PlayerStatus.KILLED }),
        ),
      ),
    );

    expect(
      await screen.findByText(
        `Les morts ne racontent pas d'histoires... Vous devez juste attendre la fin du jeu.`,
      ),
    ).toBeInTheDocument();
  });
});
