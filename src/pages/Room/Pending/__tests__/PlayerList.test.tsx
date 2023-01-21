import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { playerInPendingRoom } from '@/tests/mocks/players';
import { pendingRoomWithMultiplePlayers, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PlayerList />', () => {
  it('should show name of the players in a list', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    const { players } = pendingRoomWithMultiplePlayers;

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Criminals in the room');

    expect(await screen.findByText(players[1].name)).toBeInTheDocument();
    expect(await screen.findByText(players[2].name)).toBeInTheDocument();
  });
});
