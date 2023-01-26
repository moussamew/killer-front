import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<HomePage />', () => {
  it('should correctly show the home page', async () => {
    renderWithProviders();

    expect(
      await screen.findByText('La bonne manière de tuer vos amis..'),
    ).toBeInTheDocument();
  });

  it('should navigate to the room page if a room code exist inside the player session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders();

    await screen.findByText('Bienvenue à la fête !');

    expect(
      screen.getByText('Le code pour rejoindre cette partie est SOSPC.'),
    ).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on the join room button', async () => {
    renderWithProviders();

    await userEvent.click(await screen.findByText('Rejoindre une partie'));

    expect(
      await screen.findByText('Rejoindre cette partie'),
    ).toBeInTheDocument();
  });
});
