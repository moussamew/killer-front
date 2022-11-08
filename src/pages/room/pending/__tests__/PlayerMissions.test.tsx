import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_MISSION_ENDPOINT } from '@/constants/endpoints';
import { PlayerMissions } from '@/pages/room/pending/PlayerMissions';
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
      rest.get(PLAYER_MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([{ id: 0, content: 'Drink Jack Daniels' }]),
        ),
      ),
    );

    renderWithProviders(<PlayerMissions />);

    await screen.findByText('Drink Jack Daniels');

    fireEvent.click(screen.getByAltText('deleteMission'));

    server.use(
      rest.get(PLAYER_MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Drink Jack Daniels'),
    );

    expect(screen.queryByText('Drink Jack Daniels')).not.toBeInTheDocument();
  });
});
