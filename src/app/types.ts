import { PlayerStatus, RoomStatus } from './constants';

interface Error {
  statusCode: number;
  message: string;
  error: string;
}

export interface Player extends Error {
  id: number;
  missionId: number | null;
  name: string;
  roomCode: number | null;
  targetId: number | null;
  status: PlayerStatus;
}

export interface Room extends Error {
  code: string;
  name: string;
  status: RoomStatus;
}
