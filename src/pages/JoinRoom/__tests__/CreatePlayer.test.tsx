import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { CreatePlayer } from '../CreatePlayer';

describe('<CreatePlayer />', () => {
  it('should navigate to the room page joigned with the pseudo created by the user', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/join/X7JKL']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(await screen.findByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Morpheus' },
    });

    fireEvent.click(screen.getByText('Continue and join the room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 1,
            name: 'Morpheus',
            roomCode: 'X7JKL',
          }),
        ),
      ),
    );

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
  });

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 1,
            name: 'Trinity',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/X7JKL']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Create my own room'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });

  it('should show an error when the player cannot join the room', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot create a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <CreatePlayer roomCode="X7JKL" />
      </MemoryRouter>,
    );

    fireEvent.change(await screen.findByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Morpheus' },
    });

    fireEvent.click(screen.getByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
