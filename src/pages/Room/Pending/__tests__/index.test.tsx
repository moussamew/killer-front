import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PendingRoomPage } from '@/pages/Room/Pending';
import {
  adminPlayerSession,
  playerSessionWithRoom,
} from '@/tests/mocks/playerSession';
import { pendingRoom, roomCode } from '@/tests/mocks/room';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PendingRoomPage />', () => {
  it('should show the pending room page with the correct room code', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayerSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/room/${roomCode}`]}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Start the party')).toBeInTheDocument();
  });

  it('should not show the Start party button if the player is not an admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(playerSessionWithRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/room/${roomCode}`]}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
    expect(screen.queryByText('Start the party')).not.toBeInTheDocument();
  });
});
