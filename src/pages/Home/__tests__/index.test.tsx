import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { playerInPendingRoom } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<HomePage />', () => {
  it('should correctly show the home page', async () => {
    renderWithRouter(<AppRoutes />);

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

    renderWithRouter(<AppRoutes />);

    expect(
      await screen.findByText('Welcome to the party!'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`The code to join this room is ${roomCode}.`),
    ).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on the join room button', async () => {
    renderWithRouter(<HomePage />);

    await userEvent.click(await screen.findByText('Join a room'));

    expect(await screen.findByText('Join this room')).toBeInTheDocument();
  });
});
