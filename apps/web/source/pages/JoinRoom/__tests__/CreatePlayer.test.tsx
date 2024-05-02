import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fakePlayerOne } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreatePlayer />', () => {
  it('should navigate to the room page joigned with the pseudo created by the user', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText(t('join.room.no.pseudo'));

    await userEvent.type(
      screen.getByPlaceholderText(t('home.create.pseudo.placeholder')),
      fakePlayerOne.name,
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

  it('should navigate to home page when the user wants to create its own room', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders({ route: `/join/${roomCode}` });

    await screen.findByText(t('join.room.no.pseudo'));

    await userEvent.click(
      screen.getByText(t('home.create.room.confirm.button')),
    );

    expect(
      await screen.findByText(t('home.title'), { collapseWhitespace: false }),
    ).toBeInTheDocument();
  });
});
