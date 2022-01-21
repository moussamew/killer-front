import { PlayerStatus, RoomStatus } from './constants';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  missionId?: number;
  roomCode?: number;
  targetId?: number;
}

export interface Room {
  code: string;
  name: string;
  status: RoomStatus;
}
