import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from 'constants/endpoints';
import { server } from 'tools/server';
import { renderWithProviders } from 'tools/tests/utils';

import SettingsModal from '../SettingsModal';

const dummyProps = {
  closeModal: jest.fn(),
};

describe('<SettingsModal />', () => {
  it('should render modal settings correctly', async () => {
    renderWithProviders(<SettingsModal {...dummyProps} />);

    expect(await screen.findByText('User Settings')).toBeInTheDocument();
  });

  it('should let the user exit the current room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: 'AX78D' })),
      ),
    );

    renderWithProviders(<SettingsModal {...dummyProps} />);

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

    expect(dummyProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should let the user update his pseudo', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(<SettingsModal {...dummyProps} />);

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
});
