import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { SettingsModal } from '../SettingsModal';

describe('<SettingsModal />', () => {
  it('should render modal settings correctly', async () => {
    renderWithProviders(<SettingsModal />);

    expect(await screen.findByText('User Settings')).toBeInTheDocument();
  });

  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(<SettingsModal />);

    await screen.findByText('User Settings');

    await userEvent.type(screen.getByPlaceholderText('Neo'), 'Trinity');

    await userEvent.click(screen.getByText('Save changes'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
    );

    expect(await screen.findByPlaceholderText('Trinity'));
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.BAD_NAME',
            message: 'Player bad name',
          }),
        ),
      ),
    );

    renderWithProviders(<SettingsModal />);

    await screen.findByText('User Settings');

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
    );

    await userEvent.type(screen.getByPlaceholderText('Neo'), 'Trinity');

    await userEvent.click(screen.getByText('Save changes'));

    await screen.findByText('Player bad name');

    await userEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(screen.queryByText('Player bad name')).not.toBeInTheDocument();
  });

  it('should be able to close Update Pseudo feature', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(<SettingsModal />);

    await screen.findByText('User Settings');

    await userEvent.click(screen.getByText('Update my pseudo'));

    expect(screen.queryByText('Save changes')).not.toBeInTheDocument();
  });
});
