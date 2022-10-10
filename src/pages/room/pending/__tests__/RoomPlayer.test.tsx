import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { RoomPage } from '@/pages/room';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayerList } from '@/pages/room/pending/PlayerList';
import { RoomPlayer } from '@/pages/room/pending/RoomPlayer';
import { PlayerRole } from '@/services/player/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomPlayer />', () => {
  it('should show current player', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ id: 0, name: 'Trinity', role: PlayerRole.ADMIN }),
        ),
      ),
    );

    renderWithProviders(
      <RoomPlayer
        playerId={0}
        playerName="Trinity"
        playerRole={PlayerRole.ADMIN}
      />,
    );

    expect(await screen.findByText('Trinity')).toBeInTheDocument();
  });

  it('should show the admin icon next to the room admin to a player who is not', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ id: 0, name: 'Neo', role: PlayerRole.PLAYER }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { id: 0, name: 'Neo', role: PlayerRole.PLAYER },
            { id: 1, name: 'Trinity', role: PlayerRole.ADMIN },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PlayerList />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Neo')).toBeInTheDocument();
    expect(screen.getByText('Trinity')).toBeInTheDocument();
    expect(screen.getByAltText('admin')).toBeInTheDocument();
  });

  it('should open LeaveRoom Modal when the user click on LeaveRoom Icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            role: PlayerRole.PLAYER,
            roomCode: 'X7VBD',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7VBD/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { id: 0, name: 'Neo', role: PlayerRole.PLAYER, roomCode: 'X7VBD' },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('leaveRoom'));

    expect(screen.getByText('Leave this room')).toBeInTheDocument();
  });
});
