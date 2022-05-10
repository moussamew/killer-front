import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { HomePage } from '@/pages/home/HomePage';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import JoinRoomModal from '../JoinRoomModal';

describe('<JoinRoomModal />', () => {
  it('should render JoinRoom modal', async () => {
    renderWithProviders(<JoinRoomModal />);

    expect(await screen.findByText('Join a room')).toBeInTheDocument();
  });

  it('should close modal after joining a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Join a room'));

    fireEvent.change(screen.getByPlaceholderText('Code of the room to join'), {
      target: { value: 'X7B8K' },
    });

    fireEvent.click(screen.getByText('Join this room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Join this room'));

    expect(screen.queryByText('Join this room')).not.toBeInTheDocument();
  });

  it('should show error while joining a room', async () => {
    server.use(
      rest.put(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: 'ROOM.NOT_FOUND', message: 'Room not found' }),
        ),
      ),
    );

    renderWithProviders(<JoinRoomModal />);

    await screen.findByText('Join a room');

    fireEvent.change(screen.getByPlaceholderText('Code of the room to join'), {
      target: { value: 'AABB1' },
    });

    fireEvent.click(screen.getByText('Join this room'));

    expect(await screen.findByText('Room not found')).toBeInTheDocument();
  });
});
