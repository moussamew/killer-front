import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { JoinRoomPage } from '..';

describe('<JoinRoomPage />', () => {
  it('should let the user join automatically the room if the roomCode saved in his session is the same', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7JKL' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/X7JKL']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route
            path="/room/X7JKL"
            element={<p>Welcome to the room X7JKL!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Welcome to the room X7JKL!'),
    ).toBeInTheDocument();
  });

  it('should let the user join automatically the room if his name is correctly setted and he is not already inside a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Morpheus' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/X7JKT']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route
            path="/room/X7JKT"
            element={<p>Welcome to the room X7JKT!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Welcome to the room X7JKT!'),
    ).toBeInTheDocument();
  });
});
