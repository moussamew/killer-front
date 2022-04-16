import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from '../Home';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { server } from '@/tools/server';
import { renderWithProviders } from '@/tools/tests/utils';

describe('<Home />', () => {
  it('should correctly show the home page', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });

  it('should navigate to the room page if a room code exist inside the player session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: 'Y5XJK' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/room/Y5XJK"
            element={<p>Welcome to the room Y5XJK!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Welcome to the room Y5XJK!'),
    ).toBeInTheDocument();
  });

  it('should show an error message when the user wants to join a room without pseudo', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.BAD_PSEUDO',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Join a room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });
});
