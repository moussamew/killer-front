import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { playerInPendingRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<HomePage />', () => {
  it('should correctly show the home page', async () => {
    renderWithProviders();

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
  });

  it('should navigate to the room page if a room code exist inside the player session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders();

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on the join room button', async () => {
    renderWithProviders();

    await userEvent.click(await screen.findByText('Join a room'));

    expect(await screen.findByText('Join this room')).toBeInTheDocument();
  });
});
