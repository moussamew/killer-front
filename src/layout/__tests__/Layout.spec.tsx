import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/home/HomePage';
import { PendingRoomPage } from '@/pages/room/pending/PendingRoomPage';
import { RoomPage } from '@/pages/room/RoomPage';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { Layout } from '../Layout';

describe('<Layout />', () => {
  it('should render correctly Layout with its children', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Layout>
          <div>Hello</div>
        </Layout>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });

  it('should show the modal settings when current player click on settings icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Layout>
          <div>Hello</div>
        </Layout>
      </MemoryRouter>,
    );

    await screen.findByAltText('settings');

    fireEvent.click(screen.getByAltText('settings'));

    expect(screen.getByText('User Settings')).toBeInTheDocument();
  });

  it('should redirect the user to the home page on room leaving', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'X7VBD' })),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7VBD/players`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([{ name: 'Neo' }])),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('leaveRoom'));

    fireEvent.click(screen.getByText('Leave this room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
