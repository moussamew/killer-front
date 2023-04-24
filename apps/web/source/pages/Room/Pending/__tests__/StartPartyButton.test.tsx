import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';

import {
  pendingRoom,
  playingRoom,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession, playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<StartPartyButton />', () => {
  it('should be able to start a new party', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders();

    await userEvent.click(
      await screen.findByText(t('room.start.party.button')),
    );

    server.use(
      getPlayerSession(playingRoomSession),
      getRoomSession(roomCode, playingRoom),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(playingRoom),
      }),
    );

    expect(await screen.findByText(t('room.target.title'))).toBeInTheDocument();
  });
});
