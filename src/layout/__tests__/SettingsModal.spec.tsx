import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerTwo } from '@/tests/mocks/players';
import { playerWithoutRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<SettingsModal />', () => {
  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    renderWithProviders();

    await screen.findByText(playerWithoutRoom.name);

    await userEvent.click(screen.getByText(playerWithoutRoom.name));

    await userEvent.type(
      screen.getByPlaceholderText('New pseudo'),
      fakePlayerTwo.name,
    );

    await userEvent.click(screen.getByText('Save changes'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...playerWithoutRoom, name: fakePlayerTwo.name }),
        ),
      ),
    );

    expect(await screen.findByText(fakePlayerTwo.name));
  });
});
