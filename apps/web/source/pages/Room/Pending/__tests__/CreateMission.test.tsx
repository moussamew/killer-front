import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fakeMissionThree } from '@/tests/mocks/missions';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.join.room.code', { roomCode }));

    await userEvent.type(
      screen.getByPlaceholderText(t('room.mission.placeholder')),
      fakeMissionThree.content,
    );

    server.use(
      getPlayerSession({
        ...pendingRoomSession,
        authoredMissions: [fakeMissionThree],
      }),
    );

    await userEvent.click(
      screen.getByText(t('room.create.new.mission.button')),
    );

    expect(
      await screen.findByText(fakeMissionThree.content),
    ).toBeInTheDocument();
  });

  it.skip('should show error message if the mission is too short', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders();

    await userEvent.type(
      await screen.findByPlaceholderText(t('room.mission.placeholder')),
      'abc',
    );

    await userEvent.click(
      screen.getByText(t('room.create.new.mission.button')),
    );

    expect(
      screen.getByText(t('errors.MISSION_TOO_SHORT_CONTENT')),
    ).toBeInTheDocument();
  });
});
