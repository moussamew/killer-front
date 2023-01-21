import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { adminPlayer, playerInPendingRoom } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<PendingRoomPage />', () => {
  it('should show the pending room page with the correct room code', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    expect(await screen.findByText('Start the party')).toBeInTheDocument();
  });

  it('should not show the Start party button if the player is not an admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...playerInPendingRoom,
            name: 'MORPHEUS',
            id: 30,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
    expect(screen.queryByText('Start the party')).not.toBeInTheDocument();
  });
});
