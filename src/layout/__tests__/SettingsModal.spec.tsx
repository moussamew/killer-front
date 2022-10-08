import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
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

    fireEvent.change(screen.getByPlaceholderText('Neo'), {
      target: { value: 'Trinity' },
    });

    fireEvent.click(screen.getByText('Save changes'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
    );

    expect(await screen.findByPlaceholderText('Trinity'));
  });
});
