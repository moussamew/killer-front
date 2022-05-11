import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/home/HomePage';
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

  it('should navigate to home if the user leave a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'AX5KV' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/AX5KV']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/room/AX5KV"
            element={
              <Layout>
                <div>Hello</div>
              </Layout>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('settings'));

    fireEvent.click(screen.getByText('Leave this room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });
});
