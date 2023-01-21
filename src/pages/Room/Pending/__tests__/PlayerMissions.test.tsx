import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { PlayerMissions } from '@/pages/Room/Pending/PlayerMissions';
import { fakeMission } from '@/tests/mocks/missions';
import { playerInPendingRoom } from '@/tests/mocks/players';
import { server } from '@/tests/server';
import { renderApplication } from '@/tests/utils';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderApplication(<PlayerMissions />);

    expect(await screen.findByText('Manage my missions'));
    expect(await screen.findByPlaceholderText('Make him drink his glass dry'));
  });

  it('should remove a mission', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
    );

    renderApplication(<PlayerMissions />);

    await screen.findByText(fakeMission.content);

    await userEvent.click(screen.getByTitle('deleteMission'));

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...playerInPendingRoom,
            room: { ...playerInPendingRoom.room, missions: [] },
            authoredMissions: [],
          }),
        ),
      ),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText(fakeMission.content),
    );

    expect(screen.queryByText(fakeMission.content)).not.toBeInTheDocument();
  });
});
