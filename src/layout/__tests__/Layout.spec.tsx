import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { Layout } from '@/layout/Layout';
import { playerWithoutRoom } from '@/tests/mocks/sessions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<Layout />', () => {
  it('should show the user settings when current player click on settings icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    renderWithProviders({
      component: (
        <Layout>
          <div />
        </Layout>
      ),
    });

    await userEvent.click(await screen.findByText(playerWithoutRoom.name));

    expect(screen.getByText('User Settings')).toBeInTheDocument();
  });
});
