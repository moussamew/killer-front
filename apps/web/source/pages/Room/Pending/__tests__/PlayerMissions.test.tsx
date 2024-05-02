import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';
import { rest } from 'msw';

import { SESSION_ENDPOINT } from '@/constants/endpoints';
import { PlayerMissions } from '@/pages/Room/Pending/PlayerMissions';
import { fakeMissionOne } from '@/tests/mocks/missions';
import {
  pendingRoom,
  pendingRoomWithMultiplePlayers,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerMissions />', () => {
  it('should show the input to create a new Mission', async () => {
    renderWithProviders({ component: <PlayerMissions /> });

    expect(await screen.findByText(t('room.create.new.mission.label')));
    expect(await screen.findByPlaceholderText(t('room.mission.placeholder')));
  });

  it.skip('should remove a mission', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.join.room.code', { roomCode }));

    await userEvent.type(
      screen.getByPlaceholderText(t('room.mission.placeholder')),
      fakeMissionOne.content,
    );

    server.use(
      getPlayerSession({
        ...pendingRoomSession,
        authoredMissions: [fakeMissionOne],
      }),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify({
          ...pendingRoomWithMultiplePlayers,
          missions: [fakeMissionOne],
        }),
      }),
    );

    await userEvent.click(
      screen.getByText(t('room.create.new.mission.button')),
    );

    await screen.findByText(fakeMissionOne.content);

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ...pendingRoomSession,
            authoredMissions: [],
          }),
        ),
      ),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify({
          ...pendingRoomWithMultiplePlayers,
          missions: [],
        }),
      }),
    );

    await userEvent.click(screen.getByTitle(t('tooltip.delete.mission')));

    expect(screen.queryByText(fakeMissionOne.content)).not.toBeInTheDocument();
  });
});
