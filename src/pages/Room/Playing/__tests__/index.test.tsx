import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { PlayingRoomPage } from '@/pages/Room/Playing';
import { PlayerStatus } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PlayingRoomPage />', () => {
  it('should render playing room page with current target if the player is not dead', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/:X7JKL`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ status: RoomStatus.IN_GAME })),
      ),
      rest.get(PLAYER_TARGET_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 1, name: 'Neo' })),
      ),
      rest.get(MISSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 200, content: 'Do something' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/playing']}>
        <Routes>
          <Route path="/room/:roomCode/playing" element={<PlayingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    screen.getByText('Try to kill your target and survive!');

    expect(await screen.findByText('Neo')).toBeInTheDocument();
    expect(await screen.findByText('Do something')).toBeInTheDocument();
  });

  it('should render playing room page with dead message if the player is dead', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Trinity',
            roomCode: 'X7JKL',
            status: PlayerStatus.KILLED,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/:X7JKL`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ status: RoomStatus.IN_GAME })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/playing']}>
        <Routes>
          <Route path="/room/:roomCode/playing" element={<PlayingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Too bad! You are dead.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Dead men tell no tales.. You just have to wait for the end of the game.',
      ),
    ).toBeInTheDocument();
  });
});
