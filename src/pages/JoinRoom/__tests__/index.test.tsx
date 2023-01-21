import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { RoomPage } from '@/pages/Room';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { playerWithoutRoom, playerWithRoom } from '@/tests/mocks/players';
import {
  roomCode,
  pendingRoom,
  pendingRoomWithMultiplePlayers,
} from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<JoinRoomPage />', () => {
  it('should let the user join automatically the room if the roomCode saved in his session is the same', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/join/${roomCode}`]}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomPage />} />
          <Route path="/room/:roomCode/pending" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should let the player join automatically the room if his name is correctly setted and he is not already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/join/${roomCode}`]}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomPage />} />
          <Route path="/room/:roomCode/pending" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithRoom)),
      ),
    );

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should redirect the player to NotFound page if the room code is incorrect', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
      rest.patch(`${PLAYER_ENDPOINT}/${playerWithoutRoom.id}`, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: RoomErrorCode.BAD_ROOMCODE }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/errorCode']}>
        <Routes>
          <Route path="/join/:roomCode" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Oops, something goes wrong!');

    expect(
      screen.getByText('The room you requested can not be found.'),
    ).toBeInTheDocument();
  });
});
