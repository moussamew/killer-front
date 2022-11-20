import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<JoinRoomModal />', () => {
  it('should close modal after joining a room with player session', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await userEvent.click(await screen.findByText('Join a room'));

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      'X7B8K',
    );

    await userEvent.click(screen.getByText('Join this room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Join this room'));

    expect(screen.queryByText('Join this room')).not.toBeInTheDocument();
  });

  it('should close modal after joining a room without player session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(400), ctx.json({})),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText('Join a room'));

    await userEvent.type(screen.getByPlaceholderText('Choose a pseudo'), 'Neo');

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      'X7B8K',
    );

    await userEvent.click(screen.getByText('Join this room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Join this room'));

    expect(screen.queryByText('Join this room')).not.toBeInTheDocument();
  });

  it('should show error while joining a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: 'ROOM.NOT_FOUND', message: 'Room not found' }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await screen.findByText('Neo');

    await userEvent.click(screen.getByText('Join a room'));

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      'AABB1',
    );

    await userEvent.click(screen.getByText('Join this room'));

    expect(await screen.findByText('Room not found')).toBeInTheDocument();
  });
});
