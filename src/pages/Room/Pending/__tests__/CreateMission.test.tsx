import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { CreateMission } from '@/pages/Room/Pending/CreateMission';
import { fakeMission } from '@/tests/mocks/missions';
import { playerInPendingRoom } from '@/tests/mocks/players';
import {
  pendingRoom,
  pendingRoomWithMissions,
  roomCode,
} from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderApplication, renderComponent } from '@/tests/utils';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderApplication({ route: `/room/${roomCode}` });

    await screen.findByText(`The code to join this room is ${roomCode}.`);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      fakeMission.content,
    );

    await userEvent.click(screen.getByText('Add new mission in the room'));

    server.use(
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMissions)),
      ),
    );

    expect(await screen.findByText(fakeMission.content)).toBeInTheDocument();
  });

  it.skip('should show error message when adding a new mission has failed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderComponent(<CreateMission />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add new mission in the room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });
});
