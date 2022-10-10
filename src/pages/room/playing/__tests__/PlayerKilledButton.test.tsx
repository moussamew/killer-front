import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { RoomPage } from '@/pages/room';
import { PlayerRole } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PlayingRoomPage } from '..';

describe('<PlayerKilledButton />', () => {
  it('should open killed modal when the player click on killed button', async () => {
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
      rest.get(`${ROOM_ENDPOINT}/:X7JKL`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ status: RoomStatus.IN_GAME })),
      ),
      rest.get(PLAYER_TARGET_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 1, name: 'Neo' })),
      ),
      rest.get(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 200, content: 'Do something' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/playing']}>
        <Routes>
          <Route
            path="/room/:roomCode/playing"
            element={<RoomPage page={<PlayingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('I have been killed'));

    expect(await screen.findByText('Killed by my target')).toBeInTheDocument();
  });
});
