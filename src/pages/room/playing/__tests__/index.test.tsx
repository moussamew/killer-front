import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { RoomProvider } from '@/hooks/context/room';
import { TargetProvider } from '@/hooks/context/target';
import { PlayerRole } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PlayingRoomPage } from '..';
import { RoomPage } from '../..';

describe('<PlayingRoomPage />', () => {
  it('should render playing room page with current target if the player is not dead', async () => {
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
            element={
              <RoomProvider>
                <TargetProvider>
                  <RoomPage page={<PlayingRoomPage />} />
                </TargetProvider>
              </RoomProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Try to kill your target and survive!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Neo')).toBeInTheDocument();
    expect(screen.getByText('Do something')).toBeInTheDocument();
  });

  it('should render playing room page with dead message when there is no target to kill', async () => {
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
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'TARGET.BAD_TARGET',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL/playing']}>
        <Routes>
          <Route
            path="/room/:roomCode/playing"
            element={
              <RoomProvider>
                <TargetProvider>
                  <RoomPage page={<PlayingRoomPage />} />
                </TargetProvider>
              </RoomProvider>
            }
          />
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
