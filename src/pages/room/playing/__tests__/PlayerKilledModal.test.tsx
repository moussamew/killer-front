import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { PlayerRole, RoomStatus } from '@/constants/enums';
import { RoomProvider } from '@/hooks/context/room';
import { TargetProvider } from '@/hooks/context/target';
import { RoomPage } from '@/pages/room';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PlayingRoomPage } from '..';

describe('<PlayerKilledModal />', () => {
  it('should close killed modal when the user confirm his death', async () => {
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

    fireEvent.click(await screen.findByText('I have been killed'));

    fireEvent.click(screen.getByText('Kill me :('));

    await waitForElementToBeRemoved(() => screen.getByText('Kill me :('));

    expect(
      screen.queryByText(
        'You will not be able to play this party anymore and be considered as dead!',
      ),
    ).not.toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
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
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR_KILLED',
            message: 'Cannot kill yourself',
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

    fireEvent.click(await screen.findByText('I have been killed'));

    fireEvent.click(screen.getByText('Kill me :('));

    await screen.findByText('Cannot kill yourself');

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(screen.queryByText('Cannot kill yourself')).not.toBeInTheDocument();
  });
});
