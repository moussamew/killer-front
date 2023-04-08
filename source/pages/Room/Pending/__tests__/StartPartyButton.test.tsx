import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<StartPartyButton />', () => {
  it.skip('should be able to start a new party', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(
      await screen.findByText(t('room.start.party.button')),
    );

    /*   const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.ROOM_UPDATED,
      }),
    }); */

    const roomEventSource = `${ROOM_TOPIC}/${roomCode}`;

    /*  sources[roomEventSource].emit(messageEvent.type, messageEvent); */

    expect(await screen.findByText('Party started!')).toBeInTheDocument();

    sources[roomEventSource].close();
  });
});
