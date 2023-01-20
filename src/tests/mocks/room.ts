import { PlayerStatus } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { Room } from '@/services/room/types';

import {
  roomPlayerMorpheus,
  roomPlayerNeo,
  roomPlayerTrinity,
} from './roomPlayer';

export const roomCode = 'SOSPC';

export const pendingRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [
    {
      id: 28,
      name: 'TRINITY',
      status: PlayerStatus.ALIVE,
    },
  ],
  missions: [],
  admin: {
    id: 28,
    name: 'TRINITY',
    status: PlayerStatus.ALIVE,
  },
} satisfies Room;

export const pendingRoomWithMultiplePlayers = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [roomPlayerTrinity, roomPlayerNeo, roomPlayerMorpheus],
  missions: [],
  admin: {
    id: 28,
    name: 'TRINITY',
    status: PlayerStatus.ALIVE,
  },
} satisfies Room;
