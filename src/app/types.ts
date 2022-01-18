import { PlayerStatus, RoomStatus } from './constants';

export interface Player {
  id: number;
  missionId: number | null;
  name: string;
  roomCode: number | null;
  targetId: number | null;
  status: PlayerStatus;
}

export interface Room {
  code: string;
  name: string;
  status: RoomStatus;
}
