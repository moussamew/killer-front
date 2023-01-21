import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { AppRoutes } from '@/app/routes';
import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { playerInPlayingRoom } from '@/tests/mocks/players';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<PlayerKilledModal />', () => {
  it.skip('should close killed modal when the user confirm his death', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPlayingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByText('I have been killed'));

    await userEvent.click(screen.getByText('Kill me :('));

    await waitForElementToBeRemoved(() => screen.getByText('Kill me :('));

    expect(
      screen.queryByText(
        'You will not be able to play this party anymore and be considered as dead!',
      ),
    ).not.toBeInTheDocument();
  });
});
