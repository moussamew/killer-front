import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { endedRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { endedRoomSession, noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<EndedRoomPage />', () => {
  it('should leave the ended room page to start a new game', async () => {
    server.use(
      getPlayerSession(endedRoomSession),
      getRoomSession(roomCode, endedRoom),
    );

    renderWithProviders();

    await screen.findByText(t('room.play.another.party.button'));

    server.use(getPlayerSession(noRoomSession));

    await userEvent.click(
      screen.getByText(t('room.play.another.party.button')),
    );

    expect(
      await screen.findByText(t('home.title'), { collapseWhitespace: false }),
    ).toBeInTheDocument();
  });
});
