import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';

import {
  fakePlayerOne,
  fakePlayerThree,
  fakePlayerTwo,
} from '@/tests/mocks/players';
import {
  endedRoom,
  playingRoom,
  pendingRoom,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import {
  endedRoomSession,
  playingRoomSession,
  pendingRoomSession,
  noRoomSession,
} from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<RoomPage />', () => {
  it('should redirect player to pending room page if the status of the room is PENDING', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.welcome.title'));
  });

  it('should redirect player to playing room page if the status of the room is IN_GAME', async () => {
    server.use(
      getPlayerSession(playingRoomSession),
      getRoomSession(roomCode, playingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(
      t('room.target.to.kill', { pseudo: fakePlayerThree.name }),
    );
  });

  it('should redirect player to ended room page if the status of the room is ENDED', async () => {
    server.use(
      getPlayerSession(endedRoomSession),
      getRoomSession(roomCode, endedRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.play.another.party.button'));
  });

  it('should redirect player to join room page if the player did not have a player session', async () => {
    server.use(getPlayerSession(null));

    renderWithProviders({ route: `/room/${roomCode}` });

    expect(
      await screen.findByText(t('join.room.create.pseudo')),
    ).toBeInTheDocument();
  });

  it('should redirect the player to join room page if the user is already inside a room', async () => {
    server.use(getPlayerSession(pendingRoomSession));

    renderWithProviders({ route: '/room/P9LDG' });

    expect(
      await screen.findByText(t('join.room.already.inside.room', { roomCode })),
    ).toBeInTheDocument();
  });

  it('should navigate to new room page when SSE emits a new message with new room status', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.welcome.title'));

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

    expect(
      await screen.findByText(
        t('room.target.to.kill', { pseudo: fakePlayerThree.name }),
      ),
    ).toBeInTheDocument();
  });

  it('should refresh the room players when SSE emits a new message with new players infos', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders();

    await screen.findByText(fakePlayerOne.name);

    const newRoomInfos = {
      ...pendingRoom,
      players: [{ ...fakePlayerOne, name: fakePlayerTwo.name }],
    };

    server.use(getRoomSession(roomCode, newRoomInfos));

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(newRoomInfos),
      }),
    );

    expect(await screen.findByText(fakePlayerTwo.name)).toBeInTheDocument();
    expect(screen.queryByText(fakePlayerOne.name)).not.toBeInTheDocument();
  });

  it('should redirect to home page when SSE emits message with player outside of the room', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoom),
    );

    renderWithProviders();

    await screen.findByText(t('room.welcome.title'));

    const newRoomInfos = { ...pendingRoom, players: [] };

    server.use(
      getPlayerSession(noRoomSession),
      getRoomSession(roomCode, newRoomInfos),
    );

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(newRoomInfos),
      }),
    );

    expect(
      await screen.findByText(t('home.title'), { collapseWhitespace: false }),
    ).toBeInTheDocument();
    expect(screen.queryByText('room.welcome.title')).not.toBeInTheDocument();
  });
});
