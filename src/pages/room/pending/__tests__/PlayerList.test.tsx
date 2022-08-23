import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import { PlayerList } from '@/pages/room/pending/PlayerList';
import { server } from '@/tests/server';
import { Providers } from '@/tests/utils';

describe('<PlayerList />', () => {
  it('should show player list', async () => {
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
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { id: 0, name: 'Neo', role: PlayerRole.ADMIN },
            { id: 1, name: 'Trinity' },
            { id: 2, name: 'Morpheus' },
          ]),
        ),
      ),
    );

    render(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={
              <Providers>
                <PlayerList />
              </Providers>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Criminals in the room'),
    ).toBeInTheDocument();
    expect(screen.getByText('Neo')).toBeInTheDocument();
    expect(screen.getByText('Trinity')).toBeInTheDocument();
    expect(screen.getByText('Morpheus')).toBeInTheDocument();
  });
});
