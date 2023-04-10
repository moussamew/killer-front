import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';

import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession, noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateRoomButton />', () => {
  it('should open a room creation modal if the user does not have a session', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders();

    await screen.findByText(t('home.title'));

    await userEvent.click(screen.getByText(t('home.create.room.button')));

    expect(screen.getByText(t('home.create.pseudo.label'))).toBeInTheDocument();
    expect(
      screen.getByText(t('home.create.room.confirm.button')),
    ).toBeInTheDocument();
  });

  it('should create a new room and redirect to it for a player with session', async () => {
    server.use(getPlayerSession(noRoomSession));

    renderWithProviders();

    await screen.findByText(t('home.title'));

    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    await userEvent.click(screen.getByText(t('home.create.room.button')));

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });
});
