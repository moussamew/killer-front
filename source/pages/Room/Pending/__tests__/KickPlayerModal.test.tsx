import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerOne, fakePlayerThree } from '@/tests/mocks/players';
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
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText('MORPHEUS');

    await userEvent.click(screen.getByTitle('kick MORPHEUS'));

    await userEvent.click(screen.getByText('Expulser MORPHEUS'));

    server.use(
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomWithMultiplePlayers,
            players: [fakePlayerOne, fakePlayerThree],
          }),
        ),
      ),
    );

    await waitForElementToBeRemoved(() => screen.queryByText('MORPHEUS'));

    expect(screen.queryByText('MORPHEUS')).not.toBeInTheDocument();
  });
});
