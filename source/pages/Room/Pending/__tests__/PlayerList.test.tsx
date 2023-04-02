import { screen } from '@testing-library/react';
import { t } from 'i18next';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerThree, fakePlayerTwo } from '@/tests/mocks/players';
import { pendingRoomWithMultiplePlayers, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerList />', () => {
  it('should show name of the players in a list', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.players.list'));

    expect(screen.getByText(fakePlayerTwo.name)).toBeInTheDocument();
    expect(screen.getByText(fakePlayerThree.name)).toBeInTheDocument();
  });
});
