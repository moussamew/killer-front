import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { RoomPage } from '../RoomPage';

describe('<RoomPage />', () => {
  it('should show a room with the correct room code', async () => {
    server.use(
      rest.put(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'P9LDG' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room.</div>}
          />
          <Route path="/room/:roomCode" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('The code to join this room is P9LDG.');
  });

  it('should redirect to join room page if the user did not have a player session', async () => {
    server.use(
      rest.put(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({})),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/join/P9LDG"
            element={<div>Check user before join a room.</div>}
          />
          <Route path="/room/:roomCode" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Check user before join a room.'),
    ).toBeInTheDocument();
  });
});
