import { screen } from '@testing-library/react';

import { fakePlayerThree } from '@/tests/mocks/players';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayingRoomPage />', () => {
  it('should render playing room page with current target', async () => {
    server.use(
      getPlayerSession(playingRoomSession),
      getRoomSession(roomCode, playingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(await screen.findByText(fakePlayerThree.name)).toBeInTheDocument();
  });
});
