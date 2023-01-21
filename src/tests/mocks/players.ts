import { PlayerStatus } from '@/services/player/constants';
import { Player, PlayerSession } from '@/services/player/types';
import { RoomStatus } from '@/services/room/constants';

import { fakeMission } from './missions';
import { roomCode } from './rooms';

export const fakePlayer = {
  id: 28,
  name: 'TRINITY',
  status: PlayerStatus.ALIVE,
} satisfies Player;

export const playerWithoutRoom = {
  ...fakePlayer,
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
} satisfies PlayerSession;

export const playerWithRoom = {
  ...fakePlayer,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [fakeMission],
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [fakeMission],
} satisfies PlayerSession;

export const adminPlayer = {
  ...fakePlayer,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [],
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
} satisfies PlayerSession;
