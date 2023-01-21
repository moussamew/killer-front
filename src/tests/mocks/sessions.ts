import { PlayerSession } from '@/services/player/types';
import { RoomStatus } from '@/services/room/constants';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';
import { roomCode } from './rooms';

export const playerWithoutRoom = {
  ...fakePlayerOne,
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
} satisfies PlayerSession;

export const playerInPendingRoom = {
  ...fakePlayerOne,
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

export const playerInPlayingRoom = {
  ...fakePlayerTwo,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.IN_GAME,
    missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  },
  target: fakePlayerThree,
  killer: null,
  assignedMission: fakeMissionTwo,
  authoredMissions: [fakeMissionOne],
} satisfies PlayerSession;

export const playerInEndedRoom = {
  ...fakePlayerThree,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.ENDED,
    missions: [],
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
} satisfies PlayerSession;

export const adminPlayer = {
  ...fakePlayerOne,
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
