import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT } from '@/constants/endpoints';
import { Layout } from '@/layout/Layout';
import { noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<Layout />', () => {
  it('should show the user settings when current player click on settings icon', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    renderWithProviders({ component: <Layout /> });

    await userEvent.click(await screen.findByTitle('settings'));

    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });
});
