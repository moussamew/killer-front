import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { HomePage } from '../HomePage';

describe('<HomePage />', () => {
  it('should correctly show the home page', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
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
          <Route path="/" element={<HomePage />} />
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

  it('should open the join room modal by clicking on the join room button', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Join a room'));

    expect(await screen.findByText('Join this room')).toBeInTheDocument();
  });
});
