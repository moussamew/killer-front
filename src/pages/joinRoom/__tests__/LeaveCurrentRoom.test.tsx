import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { JoinRoomPage } from '..';
import { LeaveCurrentRoom } from '../LeaveCurrentRoom';

describe('<LeaveCurrentRoom />', () => {
  it('should return to the current room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/XAB4L']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route
            path="/room/X7JKL"
            element={<p>Welcome to the room XAB4L!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await await userEvent.click(
      await screen.findByText('Return to my current room'),
    );

    expect(
      screen.queryByText('Welcome to the room XAB4L!'),
    ).toBeInTheDocument();
  });

  it('should let the player close the error message if showed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
      rest.patch(PLAYER_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot join a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <LeaveCurrentRoom />
      </MemoryRouter>,
    );

    await await userEvent.click(
      await screen.findByText('Continue and join the room'),
    );

    await screen.findByText(
      'Cannot join a room with your player name. Please use another name.',
    );

    await await userEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(
      screen.queryByText(
        'Cannot join a room with your player name. Please use another name.',
      ),
    ).not.toBeInTheDocument();
  });
});
