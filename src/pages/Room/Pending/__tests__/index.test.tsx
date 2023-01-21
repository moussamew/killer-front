import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { adminPlayer } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

describe('<PendingRoomPage />', () => {
  it('should show the Start party button if the player is an admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
    expect(screen.getByText('Start the party')).toBeInTheDocument();
  });
});
