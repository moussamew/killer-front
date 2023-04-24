import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fakePlayerOne } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { noRoomSession, pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<JoinRoomModal />', () => {
  it('should join a room when player has a session', async () => {
    server.use(getPlayerSession(noRoomSession));

    renderWithProviders();

    await userEvent.click(await screen.findByText(t('home.join.room')));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.join.room.code.placeholder')),
      roomCode,
    );

    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    await userEvent.click(screen.getByText(t('home.join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should close modal after joining a room without player session', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders();

    await screen.findByText(t('home.title'));

    await userEvent.click(screen.getByText(t('home.join.room')));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.create.pseudo.placeholder')),
      fakePlayerOne.name,
    );

    await userEvent.type(
      screen.getByPlaceholderText(t('home.join.room.code.placeholder')),
      roomCode,
    );

    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    await userEvent.click(screen.getByText(t('home.join.room.confirm.button')));

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });
});
