import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerTwo } from '@/tests/mocks/players';
import { noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<SettingsModal />', () => {
  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    renderWithProviders();

    await screen.findByText(noRoomSession.name);

    await userEvent.click(screen.getByText(noRoomSession.name));

    await userEvent.type(
      screen.getByPlaceholderText('Nouveau nom'),
      fakePlayerTwo.name,
    );

    await userEvent.click(screen.getByText('Sauvegarder'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...noRoomSession, name: fakePlayerTwo.name }),
        ),
      ),
    );

    expect(await screen.findByText(fakePlayerTwo.name));
  });
});
