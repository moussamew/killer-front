import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { playerWithRoom, fakePlayer } from '@/tests/mocks/players';
import { roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { CreatePlayer } from '../CreatePlayer';

describe('<CreatePlayer />', () => {
  it('should navigate to the room page joigned with the pseudo created by the user', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/join/${roomCode}`]}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.type(
      await screen.findByPlaceholderText('Choose a pseudo'),
      fakePlayer.name,
    );

    await userEvent.click(
      await screen.findByText('Continue and join the room'),
    );

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithRoom)),
      ),
    );

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
  });

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/join/${roomCode}`]}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('No pseudo found yet!');

    await userEvent.click(screen.getByText('Create my own room'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });

  it.skip('should show an error when the player cannot join the room', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, async (_, res, ctx) =>
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

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      'Morpheus',
    );

    await userEvent.click(screen.getByText('Continue and join the room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
