import { RoomStatus } from '@/services/room/constants';
import { type Room } from '@/services/room/types';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';

export const roomCode = 'SOSPC';

export const pendingRoom: Room = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
  winner: null,
};

export const pendingRoomWithMissions: Room = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
  winner: null,
};

export const pendingRoomWithMultiplePlayers: Room = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne, fakePlayerTwo, fakePlayerThree],
  missions: [],
  admin: fakePlayerOne,
  winner: null,
};

export const playingRoom: Room = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.IN_GAME,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
  winner: null,
};

export const endedRoom: Room = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.ENDED,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
  winner: fakePlayerOne,
};
