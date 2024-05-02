import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe.skip('<HomePage />', () => {
  it('should correctly show the home page', async () => {
    renderWithProviders();

    expect(
      await screen.findByText(t('home.title'), { collapseWhitespace: false }),
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

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on the join room button', async () => {
    renderWithProviders();

    await userEvent.click(await screen.findByText(t('home.join.room')));

    expect(
      await screen.findByText(t('home.join.room.confirm.button')),
    ).toBeInTheDocument();
  });
});
