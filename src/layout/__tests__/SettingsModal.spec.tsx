import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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

  it('should let the user exit the current room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'AX78D' })),
      ),
    );

    renderWithProviders(<SettingsModal />);

    await screen.findByText('User Settings');

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
    );

    fireEvent.click(screen.getByText('Leave this room'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Leave this room'),
    );

    expect(screen.queryByText('Leave this room')).not.toBeInTheDocument();
  });

  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(<SettingsModal />);

    await screen.findByText('User Settings');

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
    );

    fireEvent.click(screen.getByText('Update my pseudo'));

    fireEvent.change(screen.getByPlaceholderText('Neo'), {
      target: { value: 'Trinity' },
    });

    fireEvent.click(screen.getByText('Save changes'));

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

    fireEvent.click(screen.getByText('Update my pseudo'));

    fireEvent.change(screen.getByPlaceholderText('Neo'), {
      target: { value: 'Trinity' },
    });

    fireEvent.click(screen.getByText('Save changes'));

    expect(await screen.findByText('Player bad name'));

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(screen.queryByText('Player bad name')).not.toBeInTheDocument();
  });
});
