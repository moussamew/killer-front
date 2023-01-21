import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { adminPlayer } from '@/tests/mocks/players';
import { pendingRoomWithMultiplePlayers, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

describe('<KickPlayerModal />', () => {
  it('should kick player from the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    const { players } = pendingRoomWithMultiplePlayers;

    const playerName = players[1].name;

    await screen.findByText(playerName);

    await userEvent.click(await screen.findByTitle(`kick${playerName}`));

    await userEvent.click(screen.getByText(`Kick ${playerName}`));

    await waitForElementToBeRemoved(() =>
      screen.queryByText(`Kick ${playerName}`),
    );

    expect(
      screen.queryByText('Kick players from the room'),
    ).not.toBeInTheDocument();
  });
});
