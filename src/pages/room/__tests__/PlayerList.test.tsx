import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROOM_ENDPOINT } from '../../../constants';
import { server } from '../../../tools/server';
import { renderWithProviders } from '../../../tools/tests/utils';
import PlayerList from '../PlayerList';

describe('<PlayerList />', () => {
  it('should show all the player in the room', async () => {
    server.use(
      rest.get(`${ROOM_ENDPOINT}/X7JKL/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { name: 'Neo' },
            { name: 'Trinity' },
            { name: 'Morpheus' },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<PlayerList />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Neo')).toBeInTheDocument();
    expect(await screen.findByText('Trinity')).toBeInTheDocument();
    expect(await screen.findByText('Morpheus')).toBeInTheDocument();
  });
});
