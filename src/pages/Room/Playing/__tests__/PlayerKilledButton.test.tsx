import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { playerInPlayingRoom } from '@/tests/mocks/players';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<PlayerKilledButton />', () => {
  it.skip('should open killed modal when the player click on killed button', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPlayingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await userEvent.click(screen.getByText('I have been killed'));

    expect(await screen.findByText('Killed by my target')).toBeInTheDocument();
  });
});
