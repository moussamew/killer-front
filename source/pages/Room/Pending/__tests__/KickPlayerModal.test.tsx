import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerOne, fakePlayerTwo } from '@/tests/mocks/players';
import { pendingRoomWithMultiplePlayers, roomCode } from '@/tests/mocks/rooms';
import { adminSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<KickPlayerModal />', () => {
  it.skip('should kick player from the room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomWithMultiplePlayers,
            players: [fakePlayerOne, fakePlayerTwo],
          }),
        ),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(fakePlayerTwo.name);

    await userEvent.click(screen.getByTitle(t('tooltip.kick.player')));

    server.use(
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomWithMultiplePlayers,
            players: [fakePlayerOne],
          }),
        ),
      ),
    );

    await userEvent.click(
      screen.getByText(
        t('room.kick.players.confirm.button', {
          playerName: fakePlayerTwo.name,
        }),
      ),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(fakePlayerTwo.name),
    );

    expect(screen.queryByText(fakePlayerTwo.name)).not.toBeInTheDocument();
  });
});
