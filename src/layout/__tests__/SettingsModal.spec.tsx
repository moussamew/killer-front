import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { playerWithoutRoom } from '@/tests/mocks/players';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { Layout } from '../Layout';
import { SettingsModal } from '../SettingsModal';

describe('<SettingsModal />', () => {
  it('should render modal settings correctly', async () => {
    renderWithProviders(<SettingsModal />);

    expect(await screen.findByText('User Settings')).toBeInTheDocument();
  });

  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerWithoutRoom)),
      ),
    );

    renderWithProviders(
      <Layout>
        <p>Welcome</p>
      </Layout>,
    );

    await userEvent.click(await screen.findByTitle('userSettings'));

    await userEvent.type(screen.getByPlaceholderText('New pseudo'), 'Trinity');

    await userEvent.click(screen.getByText('Save changes'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({ ...playerWithoutRoom, name: 'Trinity' }),
        ),
      ),
    );

    expect(await screen.findByText('Trinity'));
  });
});
