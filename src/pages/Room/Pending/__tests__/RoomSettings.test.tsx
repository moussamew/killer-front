import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { adminPlayer } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

describe('<RoomSettings />', () => {
  it('should show and open settings of the room if the user is the room admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByTitle('roomSettings'));

    expect(screen.queryByText('Room settings')).toBeInTheDocument();
  });
});
