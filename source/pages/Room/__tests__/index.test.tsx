import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { PlayerStatus } from '@/services/player/constants';
import {
  endedRoom,
  playingRoom,
  pendingRoom,
  roomCode,
} from '@/tests/mocks/rooms';
import {
  endedRoomSession,
  playingRoomSession,
  pendingRoomSession,
  noRoomSession,
} from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

const { PLAYER_KILLED, ROOM_UPDATED } = MercureEventType;

describe('<RoomPage />', () => {
  const roomEventSource = `${ROOM_TOPIC}/X7JKL`;

  it('should redirect player to pending room page if the status of the room is PENDING', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.welcome.title'));
  });

  it('should redirect player to playing room page if the status of the room is IN_GAME', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.target.title'));
  });

  it('should redirect player to ended room page if the status of the room is ENDED', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(endedRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(endedRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.play.another.party.button'));
  });

  it('should redirect player to join room page if the player did not have a player session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(400), ctx.json(null)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText(t('join.room.create.pseudo')),
    ).toBeInTheDocument();
  });

  it('should redirect the player to join room page if the user is already inside a room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
    );

    renderWithProviders({ route: '/room/P9LDG' });

    expect(
      await screen.findByText(t('join.room.already.inside.room', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should refresh the room status when SSE emits a new message of type ROOM_UPDATED', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(`The code to join this room is ${roomCode}.`);

    server.use(
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_UPDATED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('Try to kill your target and survive!'),
    ).toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it.skip('should refresh the room players when SSE emits a new message of type PLAYER_UPDATED', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Trinity',
              roomCode: 'X7JKL',
            },
            {
              id: 1,
              name: 'Neo',
              passcode: null,
              status: PlayerStatus.ALIVE,
              target: null,
              missionId: null,
              roomCode: 'X7JKL',
            },
          ]),
        ),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Neo');

    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Trinity',
              roomCode: 'X7JKL',
            },
            {
              id: 1,
              name: 'Morpheus',
              passcode: null,
              status: PlayerStatus.ALIVE,
              target: null,
              missionId: null,
              roomCode: 'X7JKL',
            },
          ]),
        ),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_UPDATED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Morpheus')).toBeInTheDocument();
    expect(screen.queryByText('Neo')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it.skip('should navigate to playing room page when SSE sends event of type ROOM_IN_GAME', async () => {
    const mockPlayer = {
      id: 0,
      name: 'Trinity',
      roomCode: 'X7JKL',
    };

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Welcome to the party!');

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_UPDATED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('Try to kill your target and survive!'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the party!')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it.skip('should redirect to home page when SSE sends event of type ROOM_DELETED', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(`The code to join this room is ${roomCode}.`);

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_UPDATED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText(t('home.title'))).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the party!')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it.skip('should refresh target informations when SSE sends event of type PLAYER_KILLED', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
          }),
        ),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('Do something');

    server.use(
      rest.get(MISSION_ENDPOINT, async (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ id: 200, content: 'Do another thing' }),
        ),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: PLAYER_KILLED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Do another thing')).toBeInTheDocument();
    expect(screen.queryByText('Do something')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });
});
