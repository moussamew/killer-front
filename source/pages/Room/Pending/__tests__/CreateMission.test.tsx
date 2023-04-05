import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import {
  MISSION_ENDPOINT,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { CreateMission } from '@/pages/Room/Pending/CreateMission';
import { fakeMissionThree } from '@/tests/mocks/missions';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.join.room.code', { roomCode }));

    await userEvent.type(
      screen.getByPlaceholderText(t('room.mission.placeholder')),
      fakeMissionThree.content,
    );

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            authoredMissions: [fakeMissionThree],
          }),
        ),
      ),
    );

    await userEvent.click(
      screen.getByText(t('room.create.new.mission.button')),
    );

    expect(
      await screen.findByText(fakeMissionThree.content),
    ).toBeInTheDocument();
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

    renderWithProviders({ component: <CreateMission /> });

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
