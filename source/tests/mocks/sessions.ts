import { type Session } from '@/services/player/types';
import { RoomStatus } from '@/services/room/constants';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';
import { roomCode } from './rooms';

export const noRoomSession: Session = {
  ...fakePlayerOne,
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const pendingRoomSession: Session = {
  ...fakePlayerOne,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [],
    winner: null,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const playingRoomSession: Session = {
  ...fakePlayerTwo,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.IN_GAME,
    missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
    winner: null,
  },
  target: fakePlayerThree,
  killer: null,
  assignedMission: fakeMissionTwo,
  authoredMissions: [fakeMissionOne],
};

export const endedRoomSession: Session = {
  ...fakePlayerThree,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.ENDED,
    missions: [],
    winner: null,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const adminSession: Session = {
  ...fakePlayerOne,
  room: {
    id: 17,
    code: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [],
    winner: null,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};
