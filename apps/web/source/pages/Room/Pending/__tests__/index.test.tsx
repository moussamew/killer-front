import { screen } from '@testing-library/react';
import { t } from 'i18next';

import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { adminSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PendingRoomPage />', () => {
  it('should show the pending room page with the correct room code', async () => {
    server.use(
      getPlayerSession(adminSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText(t('room.start.party.button')),
    ).toBeInTheDocument();
  });
});
