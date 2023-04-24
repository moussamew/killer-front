import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';

import {
  roomCode,
  pendingRoom,
  pendingRoomWithMultiplePlayers,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { noRoomSession, pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<JoinRoomPage />', () => {
  it('should let the user join automatically the room if the roomCode saved in his session is the same', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should let the player join automatically the room if his name is correctly setted and he is not already inside a room', async () => {
    server.use(
      getPlayerSession(noRoomSession),
      getRoomSession(roomCode, pendingRoomWithMultiplePlayers),
    );

    renderWithProviders({ route: `/join/${roomCode}` });

    server.use(getPlayerSession(pendingRoomSession));

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should redirect the player to not found page if the room code is incorrect', async () => {
    server.use(getPlayerSession(noRoomSession));

    renderWithProviders({ route: `/join/${roomCode}?scenario=room-not-found` });

    await screen.findByText(t('notfound.title'));

    expect(
      screen.getByText(t('notfound.reason', { reason: t('errors.NOT_FOUND') })),
    ).toBeInTheDocument();
  });
});
