import { PlayerSession } from '@/services/player/types';
import { RoomStatus } from '@/services/room/constants';

import { roomCode } from './room';
import {
  roomPlayerMorpheus,
  roomPlayerNeo,
  roomPlayerTrinity,
} from './roomPlayer';

export const playerSessionWithoutRoom = {
  ...roomPlayerNeo,
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
} satisfies PlayerSession;

export const adminPlayerSession = {
  ...roomPlayerTrinity,
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

export const playerSessionWithRoom = {
  ...roomPlayerMorpheus,
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
