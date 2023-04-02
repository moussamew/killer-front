import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { pendingRoomWithMissions, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<RoomMissions />', () => {
  it('should show the count of all missions in the room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMissions)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText('Il y a actuellement 3 missions dans cette partie.'),
    ).toBeInTheDocument();
  });

  it.skip('should update the count of all missions in the room when SSE emits a new message', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMissions)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('There is currently 1 missions in this room.');

    const messageEvent = new MessageEvent('message');

    const missionsEventSource = `${ROOM_TOPIC}/X7JKL/mission/{id}`;

    sources[missionsEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('There is currently 3 missions in this room.'),
    ).toBeInTheDocument();

    sources[missionsEventSource].close();
  });
});
