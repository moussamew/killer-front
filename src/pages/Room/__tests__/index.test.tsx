import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { PlayerStatus } from '@/services/player/constants';
import {
  playerInEndedRoom,
  playerInPlayingRoom,
  playerInPendingRoom,
  playerWithoutRoom,
} from '@/tests/mocks/players';
import {
  endedRoom,
  playingRoom,
  pendingRoom,
  roomCode,
} from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

const {
  PLAYER_KILLED,
  PLAYER_UPDATED,
  ROOM_DELETED,
  ROOM_IN_GAME,
  ROOM_UPDATED,
} = MercureEventType;

describe('<RoomPage />', () => {
  const roomEventSource = `${ROOM_TOPIC}/X7JKL`;

  it('should redirect player to pending room page if the status of the room is PENDING', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText('Welcome to the party!');
  });

  it('should redirect player to playing room page if the status of the room is IN_GAME', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPlayingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText('Try to kill your target and survive!');
  });

  it('should redirect player to ended room page if the status of the room is ENDED', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInEndedRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(endedRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText('Play another party!');
  });

  it('should redirect player to join room page if the player did not have a player session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(400), ctx.json(null)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText(
        'You must create a pseudo before joining this room.',
      ),
    ).toBeInTheDocument();
  });

  it('should redirect the player to join room page if the user is already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ ...pendingRoom, code: 'P9LDG' })),
      ),
    );

    renderApplication({ route: '/room/P9LDG' });

    expect(
      await screen.findByText(`Already inside the room ${roomCode}!`),
    ).toBeInTheDocument();
  });

  it.skip('should refresh the room status when SSE emits a new message of type ROOM_UPDATED', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

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
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
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

    renderApplication({ route: `/room/${roomCode}` });

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
        type: PLAYER_UPDATED,
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
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText('Welcome to the party!');

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_IN_GAME,
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
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText(`The code to join this room is ${roomCode}.`);

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: ROOM_DELETED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the party!')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it.skip('should refresh target informations when SSE sends event of type PLAYER_KILLED', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, (_, res, ctx) =>
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
              roomCode: 'X7JKL',
            },
            {
              id: 2,
              name: 'Morpheus',
              roomCode: 'X7JKL',
            },
          ]),
        ),
      ),
      rest.get(PLAYER_TARGET_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 1, name: 'Neo' })),
      ),
      rest.get(MISSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 200, content: 'Do something' })),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText('Do something');

    server.use(
      rest.get(PLAYER_TARGET_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 2, name: 'Morpheus' })),
      ),
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
