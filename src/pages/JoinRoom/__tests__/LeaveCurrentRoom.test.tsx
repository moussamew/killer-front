import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { RoomPage } from '@/pages/Room';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { playerWithRoom } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { LeaveCurrentRoom } from '../LeaveCurrentRoom';

describe('<LeaveCurrentRoom />', () => {
  it('should join a new room and leave the current one', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithRoom)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/XAB4L']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomPage />} />
          <Route path="/room/:roomCode/pending" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText(`Already inside the room ${roomCode}!`);

    await userEvent.click(screen.getByText('Continue and join the room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...playerWithRoom,
            room: { ...playerWithRoom.room, code: 'XAB4L' },
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/XAB4L`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ ...pendingRoom, code: 'XAB4L' })),
      ),
    );

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText('The code to join this room is XAB4L.'),
    ).toBeInTheDocument();
  });

  it('should let the player return to its current room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/XAB4L']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomPage />} />
          <Route path="/room/:roomCode/pending" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText(`Already inside the room ${roomCode}!`);

    await userEvent.click(screen.getByText('Return to my current room'));

    await screen.findByText('Welcome to the party!');

    expect(
      screen.getByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it.skip('should not let the player join a room if his name is already used', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot join a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <LeaveCurrentRoom />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot join a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
