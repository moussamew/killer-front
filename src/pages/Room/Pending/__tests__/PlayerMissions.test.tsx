import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_MISSION_ENDPOINT } from '@/constants/endpoints';
import { PlayerMissions } from '@/pages/Room/Pending/PlayerMissions';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderWithProviders(<PlayerMissions />);

    expect(await screen.findByText('Manage my missions'));
    expect(await screen.findByPlaceholderText('Make him drink his glass dry'));
  });

  it('should remove a mission', async () => {
    server.use(
      rest.get(PLAYER_MISSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([{ id: 0, content: 'Drink Jack Daniels' }]),
        ),
      ),
    );

    renderWithProviders(<PlayerMissions />);

    await screen.findByText('Drink Jack Daniels');

    await userEvent.click(await screen.findByTitle('deleteMission'));

    server.use(
      rest.get(PLAYER_MISSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    );

    await waitFor(() => {
      expect(screen.queryByText('Drink Jack Daniels')).not.toBeInTheDocument();
    });
  });
});
