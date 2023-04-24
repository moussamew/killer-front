import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<LeaveCurrentRoom />', () => {
  const newRoomCode = 'XAB4L';

  it('should join a new room and leave the current one', async () => {
    server.use(getPlayerSession(pendingRoomSession));

    renderWithProviders({ route: `/join/${newRoomCode}` });

    await screen.findByText(t('join.room.already.inside.room', { roomCode }));

    server.use(
      getPlayerSession({
        ...pendingRoomSession,
        room: { ...pendingRoomSession.room!, id: newRoomCode },
      }),
      getRoomSession(newRoomCode, { ...pendingRoom, id: newRoomCode }),
    );

    await userEvent.click(screen.getByText(t('join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode: newRoomCode })),
    ).toBeInTheDocument();
  });

  it('should let the player return to its current room', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/join/${newRoomCode}` });

    await screen.findByText(t('join.room.already.inside.room', { roomCode }));

    await userEvent.click(screen.getByText(t('join.room.return.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should not let the player join a room if his name is already used', async () => {
    server.use(getPlayerSession(pendingRoomSession));

    renderWithProviders({
      route: `/join/${newRoomCode}?scenario=pseudo-already-used`,
    });

    await userEvent.click(
      await screen.findByText(t('join.room.confirm.button')),
    );

    expect(screen.getByText(t('errors.ALREADY_EXIST')));
  });
});
