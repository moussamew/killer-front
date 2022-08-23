import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { HomePage } from '..';
import { CreateRoomButton } from '../CreateRoomButton';

describe('<CreateRoomButton />', () => {
  it('should redirect to create room modal for a player without session', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByText('Create new room'));

    expect(screen.getByText('Create my room')).toBeInTheDocument();
  });

  it('should create a new room and redirect to it for a player with session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity' })),
      ),
      rest.post(ROOM_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ code: 'YZVB5' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/room/YZVB5"
            element={<p>Welcome to the room YZVB5!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByText('Create new room'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: 'YZVB5' })),
      ),
    );

    expect(
      await screen.findByText(`Welcome to the room YZVB5!`),
    ).toBeInTheDocument();
  });

  it('should show error message while creating new room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity' })),
      ),
    );

    renderWithProviders(<CreateRoomButton />);

    await userEvent.click(await screen.findByText('Create new room'));

    expect(
      await screen.findByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity' })),
      ),
    );

    renderWithProviders(<CreateRoomButton />);

    await screen.findByText('Create new room');

    await userEvent.click(screen.getByText('Create new room'));

    await screen.findByText(
      'An error has occured while creating a new room. Please retry later.',
    );

    await userEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(
      screen.queryByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).not.toBeInTheDocument();
  });
});
