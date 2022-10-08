import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { RoomProvider } from '@/hooks/context/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayerRole } from '@/services/player/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PendingRoomPage />', () => {
  it('should show the pending room page with the correct room code', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ name: 'Neo', roomCode: 'P9LDG', role: PlayerRole.ADMIN }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={
              <RoomProvider>
                <PendingRoomPage />
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('The code to join this room is P9LDG.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Start the party')).toBeInTheDocument();
  });

  it('should not show the Start party button if the player is not an admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            name: 'Trinity',
            roomCode: 'P9LDG',
            role: PlayerRole.PLAYER,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={
              <RoomProvider>
                <PendingRoomPage />
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('The code to join this room is P9LDG.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Start the party')).not.toBeInTheDocument();
  });
});
