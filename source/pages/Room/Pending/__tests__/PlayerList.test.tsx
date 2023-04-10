import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';
import { t } from 'i18next';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import {
  fakePlayerOne,
  fakePlayerThree,
  fakePlayerTwo,
} from '@/tests/mocks/players';
import {
  pendingRoomWithMultiplePlayers,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
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

  it('should kick player when clicking on kick player icon', async () => {
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

    const newRoomInfos = {
      ...pendingRoomWithMultiplePlayers,
      players: [fakePlayerOne, fakePlayerThree],
    };

    server.use(
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(newRoomInfos)),
      ),
    );

    await userEvent.click(
      screen.getByTitle(
        t('tooltip.kick.player', { playerName: fakePlayerTwo.name }),
      ),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(newRoomInfos),
      }),
    );

    await waitForElementToBeRemoved(() => screen.getByText(fakePlayerTwo.name));

    expect(screen.queryByText(fakePlayerTwo.name)).not.toBeInTheDocument();
  });
});
