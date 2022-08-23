import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import {
  MercureEventType,
  PlayerRole,
  PlayerStatus,
  RoomStatus,
} from '@/constants/enums';
import { HomePage } from '@/pages/home';
import { JoinRoomPage } from '@/pages/joinRoom';
import { RoomPage } from '@/pages/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayingRoomPage } from '@/pages/room/playing';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe.skip('<RoomPage />', () => {
  const roomEventSource = `${ROOM_TOPIC}/X7JKL`;

  it('should redirect player to PendingRoom page if the status of the room is PENDING', async () => {
    const mockPlayer = { id: 0, name: 'Neo', roomCode: 'P9LDG' };

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/P9LDG/players`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
      rest.get(`${ROOM_ENDPOINT}/P9LDG`, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            code: 'P9LDG',
            name: `Neo's room`,
            status: RoomStatus.PENDING,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/room/:roomCode/pending"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
          <Route path="/room/:roomCode" element={<RoomPage page={<div />} />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Welcome to the party!');
  });

  it('should redirect player to PlayingRoom page if the status of the room is IN_GAME', async () => {
    const mockPlayer = { id: 0, name: 'Neo', roomCode: 'P9LDG' };

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/P9LDG/players`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
      rest.get(`${ROOM_ENDPOINT}/P9LDG`, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            code: 'P9LDG',
            name: `Neo's room`,
            status: RoomStatus.IN_GAME,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/room/:roomCode/playing"
            element={<RoomPage page={<PlayingRoomPage />} />}
          />
          <Route path="/room/:roomCode" element={<RoomPage page={<div />} />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Try to kill your target and survive!');
  });

  it('should redirect player to JoinRoom page if the player did not have a player session', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomPage page={<div />} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(
        'You must create a pseudo before joining this room.',
      ),
    ).toBeInTheDocument();
  });

  it('should redirect the player to JoinRoom page if the user is already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X4KLP' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Already inside the room X4KLP!'),
    ).toBeInTheDocument();
  });

  it('should refresh the room players when SSE emits a new message without any type', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Trinity',
              roomCode: 'X7JKL',
              role: PlayerRole.ADMIN,
            },
            {
              id: 1,
              name: 'Neo',
              passcode: null,
              status: PlayerStatus.ALIVE,
              role: PlayerRole.PLAYER,
              target: null,
              missionId: null,
              roomCode: 'X7JKL',
            },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Neo');

    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Trinity',
              roomCode: 'X7JKL',
              role: PlayerRole.ADMIN,
            },
            {
              id: 1,
              name: 'Morpheus',
              passcode: null,
              status: PlayerStatus.ALIVE,
              role: PlayerRole.PLAYER,
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
        type: MercureEventType.NO_EVENT,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Morpheus')).toBeInTheDocument();
    expect(screen.queryByText('Neo')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it('should navigate to PlayingRoom page when SSE sends event of type ROOM_IN_GAME', async () => {
    const mockPlayer = {
      id: 0,
      name: 'Trinity',
      roomCode: 'X7JKL',
      role: PlayerRole.ADMIN,
    };

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/pending']}>
        <Routes>
          <Route
            path="/room/:roomCode/playing"
            element={<RoomPage page={<PlayingRoomPage />} />}
          />
          <Route
            path="/room/:roomCode/pending"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Welcome to the party!');

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.ROOM_IN_GAME,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('Try to kill your target and survive!'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the party!')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it('should redirect to home page when SSE sends event of type ROOM_DELETED', async () => {
    const mockPlayer = {
      id: 0,
      name: 'Trinity',
      roomCode: 'X7JKL',
      role: PlayerRole.ADMIN,
    };

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(mockPlayer)),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([mockPlayer])),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/pending']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/room/:roomCode/pending"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Welcome to the party!');

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ ...mockPlayer, roomCode: null })),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.ROOM_DELETED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the party!')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });

  it('should refresh target informations when SSE sends event of type PLAYER_KILLED', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              id: 0,
              name: 'Trinity',
              roomCode: 'X7JKL',
              role: PlayerRole.ADMIN,
            },
            {
              id: 1,
              name: 'Neo',
              roomCode: 'X7JKL',
              role: PlayerRole.PLAYER,
            },
            {
              id: 2,
              name: 'Morpheus',
              roomCode: 'X7JKL',
              role: PlayerRole.PLAYER,
            },
          ]),
        ),
      ),
      rest.get(PLAYER_TARGET_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 1, name: 'Neo' })),
      ),
      rest.get(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 200, content: 'Do something' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/playing']}>
        <Routes>
          <Route
            path="/room/:roomCode/playing"
            element={<RoomPage page={<PlayingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Do something');

    server.use(
      rest.get(PLAYER_TARGET_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 2, name: 'Morpheus' })),
      ),
      rest.get(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ id: 200, content: 'Do another thing' }),
        ),
      ),
    );

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        type: MercureEventType.PLAYER_KILLED,
      }),
    });

    sources[roomEventSource].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Do another thing')).toBeInTheDocument();
    expect(screen.queryByText('Do something')).not.toBeInTheDocument();

    sources[roomEventSource].close();
  });
});
