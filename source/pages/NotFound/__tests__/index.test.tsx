import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<NotFoundPage />', () => {
  it('should redirect the player to the home page if wanted', async () => {
    renderWithProviders({ route: '/unknown' });

    await screen.findByText(t('notfound.title'));

    await userEvent.click(screen.getByText(t('notfound.back')));

    expect(await screen.findByText(t('home.title'))).toBeInTheDocument();
  });

  it.skip('should display an error message if needed', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
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
