import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import {
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { playerInPendingRoom } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<StartPartyButton />', () => {
  it.skip('should be able to start a new party', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByText('Start the party'));

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.ROOM_IN_GAME,
      }),
    });

    const roomEventSource = `${ROOM_TOPIC}/${roomCode}`;

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Party started!')).toBeInTheDocument();

    sources[roomEventSource].close();
  });
});
