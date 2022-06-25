import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
  ROOM_TOPIC,
} from '@/constants/endpoints';
import { MercureEventType, PlayerRole, PlayerStatus } from '@/constants/enums';
import { RoomProvider } from '@/hooks/context/room';
import { RoomPage } from '@/pages/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomPage />', () => {
  it('should redirect to join room page if the user did not have a player session', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room.</div>}
          />
          <Route path="/room/:roomCode" element={<RoomPage page={<div />} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Check user before join a room.'),
    ).toBeInTheDocument();
  });

  it('should redirect to join room page if the user is already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X4KLP' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room.</div>}
          />
          <Route
            path="/room/:roomCode"
            element={
              <RoomProvider>
                <RoomPage page={<PendingRoomPage />} />
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Check user before join a room.'),
    ).toBeInTheDocument();
  });

  it('should update the players list when SSE emits a new message', async () => {
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
            element={
              <RoomProvider>
                <RoomPage page={<PendingRoomPage />} />
              </RoomProvider>
            }
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

    sources[`${ROOM_TOPIC}/X7JKL`].emit(messageEvent.type, messageEvent);

    expect(await screen.findByText('Morpheus')).toBeInTheDocument();
    expect(screen.queryByText('Neo')).not.toBeInTheDocument();
  });
});
