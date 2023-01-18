import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  PLAYER_TARGET_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { PlayingRoomPage } from '@/pages/Room/Playing';
import { RoomStatus } from '@/services/room/constants';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

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
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/:X7JKL`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ status: RoomStatus.IN_GAME })),
      ),
      rest.get(PLAYER_TARGET_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: 1, name: 'Neo' })),
      ),
      rest.get(MISSION_ENDPOINT, (_req, res, ctx) =>
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

    await userEvent.click(await screen.findByText('I have been killed'));

    await userEvent.click(screen.getByText('Kill me :('));

    await waitForElementToBeRemoved(() => screen.getByText('Kill me :('));

    expect(
      screen.queryByText(
        'You will not be able to play this party anymore and be considered as dead!',
      ),
    ).not.toBeInTheDocument();
  });
});
