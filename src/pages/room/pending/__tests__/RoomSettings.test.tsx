import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { RoomProvider } from '@/hooks/context/room';
import { RoomPage } from '@/pages/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayerRole } from '@/services/player/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomSettings />', () => {
  it('should show and open settings of the room if the user is the room admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
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

    fireEvent.click(await screen.findByAltText('roomSettings'));

    expect(screen.getByText('Neo')).toBeInTheDocument();
    expect(screen.queryByText('Room settings')).toBeInTheDocument();
  });

  it('should not show the settings of the room if the user is not the room admin', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
            role: PlayerRole.PLAYER,
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
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

    expect(await screen.findByText('Neo')).toBeInTheDocument();
    expect(screen.queryByText('Room settings')).not.toBeInTheDocument();
  });
});
