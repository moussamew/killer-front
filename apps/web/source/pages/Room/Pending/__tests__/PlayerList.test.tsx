import { t } from '@killerparty/intl';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sources } from 'eventsourcemock';

import {
  fakePlayerOne,
  fakePlayerThree,
  fakePlayerTwo,
} from '@/tests/mocks/players';
import {
  pendingRoomWithMultiplePlayers,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerList />', () => {
  it('should show name of the players in a list', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoomWithMultiplePlayers),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.players.list'));

    expect(screen.getByText(fakePlayerTwo.name)).toBeInTheDocument();
    expect(screen.getByText(fakePlayerThree.name)).toBeInTheDocument();
  });

  it('should kick player when clicking on kick player icon', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoomWithMultiplePlayers),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.players.list'));

    const newRoomInfos = {
      ...pendingRoomWithMultiplePlayers,
      players: [fakePlayerOne, fakePlayerThree],
    };

    server.use(getRoomSession(roomCode, newRoomInfos));

    await userEvent.click(
      screen.getByTitle(
        t('tooltip.kick.player', { playerName: fakePlayerTwo.name }),
      ),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(newRoomInfos),
      }),
    );

    await waitForElementToBeRemoved(() => screen.getByText(fakePlayerTwo.name));

    expect(screen.queryByText(fakePlayerTwo.name)).not.toBeInTheDocument();
  });
});
