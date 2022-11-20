import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { LeaveCurrentRoom } from '../LeaveCurrentRoom';

describe('<LeaveCurrentRoom />', () => {
  it('should join a new room and leave the current one', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/XAB4L']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Already inside the room X7JKL!');

    fireEvent.click(screen.getByText('Continue and join the room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'XAB4L' })),
      ),
    );

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('The code to join this room is XAB4L.'),
    ).toBeInTheDocument();
  });

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
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Return to my current room'));

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
  });

  it('should not let the player join a room if his name is already used', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
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

    fireEvent.click(await screen.findByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot join a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
