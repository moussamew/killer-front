import { RoomStatus } from '@/services/room/constants';
import { type Room } from '@/services/room/types';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';

export const roomCode = 'SOSPC';

export const pendingRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
} satisfies Room;

export const pendingRoomWithMissions = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
} satisfies Room;

export const pendingRoomWithMultiplePlayers = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne, fakePlayerTwo, fakePlayerThree],
  missions: [],
  admin: fakePlayerOne,
} satisfies Room;

export const playingRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.IN_GAME,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
} satisfies Room;

export const endedRoom = {
  id: 17,
  code: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.ENDED,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
} satisfies Room;
