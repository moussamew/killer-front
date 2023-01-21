import { PlayerStatus } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { Room } from '@/services/room/types';

import { fakeMission } from './missions';

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

export const pendingRoomWithMissions = {
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
  missions: [fakeMission],
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
  players: [
    {
      id: 28,
      name: 'TRINITY',
      status: PlayerStatus.ALIVE,
    },
    {
      id: 29,
      name: 'NEO',
      status: PlayerStatus.ALIVE,
    },
    {
      id: 30,
      name: 'MORPHEUS',
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

export const playingRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.IN_GAME,
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

export const endedRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.ENDED,
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
