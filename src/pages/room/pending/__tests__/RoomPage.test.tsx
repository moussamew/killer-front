import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { RoomPage } from '@/pages/room';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PendingRoomPage } from '..';

describe('<RoomPage />', () => {
  it('should show a room with the correct room code', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'P9LDG' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('The code to join this room is P9LDG.'),
    ).toBeInTheDocument();
  });

  it('should redirect to join room page if the user did not have a player session', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room.</div>}
          />
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
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
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Check user before join a room.'),
    ).toBeInTheDocument();
  });
});
