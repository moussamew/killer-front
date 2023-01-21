import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { fakePlayerOne } from '@/tests/mocks/players';
import { roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<JoinRoomModal />', () => {
  it('should close modal after joining a room with player session', async () => {
    renderWithProviders();

    await userEvent.click(await screen.findByText('Join a room'));

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      roomCode,
    );

    await userEvent.click(screen.getByText('Join this room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Join this room'));

    expect(screen.queryByText('Join this room')).not.toBeInTheDocument();
  });

  it('should close modal after joining a room without player session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(400), ctx.json(null)),
      ),
    );

    renderWithProviders();

    await screen.findByText('The right way to kill your friends..');

    await userEvent.click(screen.getByText('Join a room'));

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      fakePlayerOne.name,
    );

    await userEvent.type(
      screen.getByPlaceholderText('Code of the room'),
      roomCode,
    );

    await userEvent.click(screen.getByText('Join this room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Join this room'));

    expect(screen.queryByText('Join this room')).not.toBeInTheDocument();
  });

  it.skip('should show error while joining a room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: 'ROOM.NOT_FOUND', message: 'Room not found' }),
        ),
      ),
    );

    renderWithProviders();

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
