import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { EndedRoomPage } from '@/pages/Room/Ended';
import { PlayerRole } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<EndedRoomPage />', () => {
  // Fix this test by updating EndedRoom logic
  it.skip('should leave the EndedRoomPage to start a new game', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
            role: PlayerRole.PLAYER,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/:X7JKL`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ status: RoomStatus.ENDED })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/ended']}>
        <Routes>
          <Route path="/room/:roomCode/ended" element={<EndedRoomPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Play another party!'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: null,
            role: PlayerRole.PLAYER,
          }),
        ),
      ),
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
