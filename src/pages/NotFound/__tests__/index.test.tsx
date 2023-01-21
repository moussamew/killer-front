import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<NotFoundPage />', () => {
  it('should redirect the player to the home page if wanted', async () => {
    renderWithProviders({ route: '/unknown' });

    await screen.findByText('Oops, something goes wrong!');

    await userEvent.click(screen.getByText('Go back to home page'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Go back to home page')).not.toBeInTheDocument();
  });

  it.skip('should display an error message if needed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: RoomErrorCode.BAD_ROOMCODE,
            message:
              'The roomCode need to be provided with a correct format (5 characters).',
          }),
        ),
      ),
    );

    renderWithProviders({ route: '/join/X7JK' });

    await screen.findByText('Oops, something goes wrong!');

    expect(
      await screen.findByText(
        'Reason: The roomCode need to be provided with a correct format (5 characters).',
      ),
    ).toBeInTheDocument();
  });
});
